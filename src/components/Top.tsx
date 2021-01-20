import * as React from "react";
import "../styles/style.css";

//youtube
import YouTube from "react-youtube";

//movie-trailer
import movieTrailer from "movie-trailer";

import "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
//image
//import mayor from "../assets/images/mayorkun.jpg";

import axios from "../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

interface Props {
  fetchUrl: string;
}

export const Top: React.FC<Props> = ({ fetchUrl }: Props) => {
  //use effect
  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get(fetchUrl);
      setRandomMovie(
        res.data.results[Math.floor(Math.random() * res.data.results.length)]
      );
    }
    fetchData();
  }, [fetchUrl]);

  //random movie
  const [randomMovie, setRandomMovie] = React.useState<any[]>([]);
  console.log(randomMovie);

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
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${randomMovie["backdrop_path"]})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          objectFit: "contain",
          backgroundPosition: "center center",
        }}
        className="head px-2"
      >
        <h2 className="title font-bold text-xl">
          {randomMovie["original_title"]}
        </h2>

        <p className="px-2 md:px-12 text-sm">{randomMovie["overview"]}</p>
        {/* { <button className="btn">Read More</button>} */}

        <div className="mt-2">
          <button onClick={() => handleTrailer(randomMovie)} className="btn">
            Preview <FontAwesomeIcon icon={faVideo} size="1x" />
          </button>
        </div>
      </div>
      {trailer && <YouTube videoId={trailer} opts={opts} />}
    </React.Fragment>
  );
};

export default Top;
