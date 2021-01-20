export const API_KEY = "5cfcbf50de8697131fda719fdf4e1279";

//https://api.themoviedb.org/3/movie/550?api_key=5cfcbf50de8697131fda719fdf4e1279

interface Props {
  fetchPopular: string;
  fetchUpcoming: string;
  fetchTopRated: string;
}

export const requests: Props = {
  fetchPopular: `/movie/popular?api_key=${API_KEY}`,
  fetchUpcoming: `movie/upcoming?api_key=${API_KEY}&page=2`,
  fetchTopRated: `movie/top_rated?api_key=${API_KEY}`,
};

export default requests;
