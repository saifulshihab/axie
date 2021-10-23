import { gql, useQuery } from "@apollo/client";
import Loader from "./components/Loader";

const GET_AXIE_BRIEF_LIST = gql`
  query GetAxieBriefList {
    axies {
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
  const { loading, error, data } = useQuery(GET_AXIE_BRIEF_LIST);

  console.log(data);
  return (
    <div class="container">
      <div class="jumbotron">
        <h1 class="display-4">Axies API</h1>
        <p class="lead">Data from Axies</p>
        <hr class="my-4" />
        <div>
          {loading ? (
            <Loader />
          ) : error ? (
            "Failed to load data.."
          ) : data && data.axies?.results?.length > 0 ? (
            <table class="table table-striped">
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
                {data.axies?.results?.map((item) => (
                  <tr>
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
