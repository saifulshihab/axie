import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import Loader from "./components/Loader";

const GET_AXIE_BRIEF_LIST = gql`
  query GetAxieBriefList(
    $auctionType: AuctionType
    $criteria: AxieSearchCriteria
    $from: Int
    $sort: SortBy
    $size: Int
    $owner: String
  ) {
    axies(
      auctionType: $auctionType
      criteria: $criteria
      from: $from
      sort: $sort
      size: $size
      owner: $owner
    ) {
      results {
        id
        title
        name
        stage
        class
        breedCount
        auction {
          currentPrice
          currentPriceUSD
        }
      }
    }
  }
`;
function App() {
  const [limit, setLimit] = useState(10);

  const { loading, error, data } = useQuery(GET_AXIE_BRIEF_LIST, {
    variables: { auctionType: "Sale", from: 0, size: limit, sort: "PriceAsc" },
  });
  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">Axies API</h1>
        <p className="lead">Data from Axies</p>
        <hr className="my-4" />
        <div>
          <div className="d-flex justify-content-between">
            <p className="fw-bold">Showing {limit} results</p>
            {/* <select
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
              name="limitSelect"
              id="limitSelect"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select> */}
            <input
              value={limit ? limit : 0}
              style={{
                border: "1px solid #ddd",
                textAlign: "center",
                outline: "none",
              }}
              onChange={(e) => setLimit(parseInt(e.target.value))}
            />
          </div>
          {loading ? (
            <Loader />
          ) : error ? (
            "Failed to load data.."
          ) : data && data.axies?.results?.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Name</th>
                  <th scope="col">Stage</th>
                  <th scope="col">className</th>
                  <th scope="col">Breed Count</th>
                  <th scope="col">Current Price</th>
                  <th scope="col">Current Price USD</th>
                </tr>
              </thead>
              <tbody>
                {data.axies?.results?.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.title ? item.title : "-"}</td>
                    <td>{item.name}</td>
                    <td>{item.stage}</td>
                    <td>{item.className}</td>
                    <td>{item.breedCount}</td>
                    <td>
                      {item.auction?.currentPrice
                        ? item.auction.currentPrice
                        : 0}
                    </td>
                    <td>
                      {item.auction?.currentPriceUSD
                        ? item.auction.currentPriceUSD
                        : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No data found"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
