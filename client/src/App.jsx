import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
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
  const [axieData, setAxieData] = useState({ axies: { results: [] } });

  const [limit, setLimit] = useState(10);
  const [auctionType, setAuctionType] = useState("Sale");

  const { loading, error, data, fetchMore } = useQuery(GET_AXIE_BRIEF_LIST, {
    variables: {
      auctionType: auctionType,
      from: 0,
      size: limit,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data) {
      setAxieData(data);
    }
  }, [data]);

  console.log("DATA", data);

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">Axies API</h1>
        <p className="lead">Data from Axies</p>
        <hr className="my-4" />
        <div className="d-flex justify-content-between">
          <div>
            <p className="fw-bold">Showing {limit} results</p>
          </div>
          <div>
            <select
              className="form-select"
              value={auctionType}
              onChange={(e) => setAuctionType(e.target.value)}
              name="setAuctionType"
              id="setAuctionType"
            >
              <option value="All">All</option>
              <option value="Sale">For sale</option>
              <option value="NotForSale">Not for sale</option>
            </select>
          </div>
          <div>
            <input
              className="form-control text-end"
              value={limit ? limit : 0}
              style={{
                outline: "none",
              }}
              onChange={(e) => setLimit(parseInt(e.target.value))}
            />
          </div>
          <button
            className="btn btn-info"
            onClick={() =>
              fetchMore({
                variables: {
                  auctionType: auctionType,
                  from: axieData.axies?.results?.length,
                  size: limit,
                },
              })
            }
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
        <div>
          {loading ? (
            <Loader />
          ) : error ? (
            "Failed to load data.."
          ) : axieData && axieData.axies?.results?.length ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Name</th>
                  <th scope="col">Stage</th>
                  <th scope="col">Class</th>
                  <th scope="col">Breed Count</th>
                  <th scope="col">Current Price</th>
                  <th scope="col">Current Price USD</th>
                </tr>
              </thead>
              <tbody>
                {data.axies?.results?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.id}</td>
                    <td>{item.title ? item.title : "-"}</td>
                    <td>{item.name}</td>
                    <td>{item.stage}</td>
                    <td>{item.class}</td>
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
