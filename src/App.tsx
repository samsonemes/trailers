import * as React from "react";

//axios
import axios from "./axios";

//css
import "./styles/style.css";

//urls
import requests from "./requests";

import Top from "./components/Top";
import Popular from "./components/Popular";
import Upcoming from "./components/Upcoming";
import TopRated from "./components/TopRated";
import Footer from "./components/Footer";
//import SmallBoard from "./components/Small";

export const App: React.FC = () => {
  React.useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/movie/popular?api_key=5cfcbf50de8697131fda719fdf4e1279`
      );
      //console.log(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <nav>
        <Top fetchUrl={requests.fetchPopular} />
      </nav>

      <main>
        <Popular title="Popular Movies" fetchPopular={requests.fetchPopular} />

        <Upcoming
          title="Upcoming Movies"
          fetchUpcoming={requests.fetchUpcoming}
        />

        <TopRated
          title="Top Rated Movies"
          fetchTopRated={requests.fetchTopRated}
        />
      </main>

      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
};

export default App;
