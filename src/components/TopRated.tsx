import * as React from "react";
import Loader from "react-loader";

//youtube
import YouTube from "react-youtube";

//movie-trailer
import movieTrailer from "movie-trailer";

import axios from "../axios";
const baseUrl = "https://image.tmdb.org/t/p/original";

interface Props {
  title: string;
  fetchTopRated: string;
}

interface Props {
  title: string;
  fetchTopRated: string;
}
export const TopRated: React.FC<Props> = ({ fetchTopRated, title }: Props) => {
  const [topRated, setTopRated] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get(fetchTopRated);
      setTopRated(res.data.results);
      console.log(res.data.results);
      return res;
    }
    fetchData();
  }, [fetchTopRated]);

  //trailer
  const [trailer, setTrailer] = React.useState<any>("");

  const handleTrailer = (movie) => {
    if (trailer) {
      setTrailer("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          //https://www.youtube.com/watch?v=oSzv3K3Keyg
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailer(urlParams.get("v"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //options
  const opts: any = {
    width: "100%",
    height: "320",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <React.Fragment>
      <h2
        style={{ textAlign: "center" }}
        className="mt-12 text-2xl tracking-wider mb-3"
      >
        {title}
      </h2>
      <div className="photo-s cursor-pointer">
        {topRated.length <= 0 ? (
          <Loader />
        ) : (
          topRated.map((movie) => {
            return (
              <img
                key={movie.id}
                onClick={() => handleTrailer(movie)}
                className="photo_l"
                src={`${baseUrl}${movie.poster_path}`}
                alt=""
              />
            );
          })
        )}
      </div>
      {trailer && <YouTube videoId={trailer} opts={opts} />}
    </React.Fragment>
  );
};

export default TopRated;
