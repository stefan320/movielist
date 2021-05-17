import axios from "axios";
import * as actionTypes from "./actionTypes";
import { mergeArrays } from "../utilities/utilities";

let allMovies = null;

const sortMovies = (moviesArr, sortBy, order = "decending") => {
  //Recives an array and sort the items according to sortBy parameter
  // IMPORTANT: SortBy value parameter should be The name of propery in the Array ie. title / rating
  const sortedMovies = moviesArr.sort((a, b) => a[sortBy] - b[sortBy]);
  if (order === "decending") {
    return sortedMovies.reverse();
  } else {
    return sortedMovies;
  }
};

const limitDisplayMovies = (movies, limit = 8) => movies.slice(0, limit);

export const initMovieList = (dispatch, searchQuery) => {
  const key = "$2b$10$QTMZaMPzjv.J7fnQLPoQSOCkpB4W5lZ/cp4zX/CqZR6l3LZ1LzT.G";
  axios
    .get("https://api.jsonbin.io/v3/b/6093c87065b36740b92f4838/4", {
      headers: {
        "X-Master-Key": key,
      },
    })
    .then((response) => {
      // handle success
      allMovies = response.data.record;
      if (searchQuery) {
        // Parse query
        const queryParams = new URLSearchParams(searchQuery);
        const searchFilter = queryParams.get("searchFilter");
        const genres = queryParams.get("genres").split(",");
        const order = queryParams.get("order");

        let movies = allMovies;
        movies = mergeArrays(filterMoviesByGenre(genres, allMovies));
        // Then filter the matchedGenreMovies that matches the value of search field
        movies = movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchFilter.toLowerCase())
        );

        // Finaly sort the movies accordingly
        movies = sortMovies(movies, order);

        dispatch(initPageWithQuery(movies, searchFilter, genres, order));
      } else {
        const topRatedMovies = sortMovies(allMovies, "rating");
        const topEightMovies = limitDisplayMovies(topRatedMovies).slice(0, 8);
        return dispatch(initPage(topEightMovies));
      }
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
};

export const initPage = (topEightMovies) => {
  return {
    type: actionTypes.INIT_APP,
    topEightMovies,
  };
};

export const initPageWithQuery = (
  displayedMovies,
  searchFilter,
  genres,
  order
) => {
  return {
    type: actionTypes.INIT_APP_WITH_QUERY,
    displayedMovies,
    searchFilter,
    genres,
    order,
  };
};

// recives an array with filters ie [crime, drama] and an array  with all movies
// if there are filters it will return an array with an array for each filter with matches ie. [[...crimeMovies],[...dramMovies]]
const filterMoviesByGenre = (filtersArr, allMovies) => {
  if (filtersArr.length > 0) {
    return filtersArr.map((filter) => {
      return allMovies.filter((movie) => movie.genre.toLowerCase() === filter);
    });
  } else {
    return allMovies;
  }
};

// Check if clicked filter is already in the arr
const updateFilterList = (filtersArr, filter) => {
  filter = filter.toLowerCase();
  return filtersArr.includes(filter)
    ? // if yes remove it
      filtersArr.filter((filterItem) => filterItem !== filter)
    : //else add it
      filtersArr.concat(filter);
};

export const filterMovieList = (
  filter,
  filtersArr,
  queryString,
  sortByValue
) => {
  // add / remove the clicked filter from filtersArr
  const updatedFiltersArr = updateFilterList(filtersArr, filter);

  // Check which movies matches the current selected genres
  const matchedGenreMovies = mergeArrays(
    filterMoviesByGenre(updatedFiltersArr, allMovies)
  );

  // Then filter the matchedGenreMovies that matches the value of search field
  const filteredMovies = matchedGenreMovies.filter((movie) =>
    movie.genre.toLowerCase().includes(queryString.toLowerCase())
  );

  // Finaly sort the movies accordingly
  const sortedMovies = sortMovies(filteredMovies, sortByValue);
  return updateFiltersResults(updatedFiltersArr, sortedMovies, queryString);
};

const updateFiltersResults = (updatedFiltersArr, sortedMovies, queryString) => {
  return {
    type: actionTypes.FILTER_CHANGED,
    filtersArr: updatedFiltersArr,
    displayedMovies: sortedMovies,
    searchFilterValue: queryString,
  };
};

export const updateSearchResults = (queryString, filtersArr, sortByValue) => {
  const matchedGenreMovies = mergeArrays(
    filterMoviesByGenre(filtersArr, allMovies)
  );
  const filteredMovies = matchedGenreMovies.filter((movie) =>
    movie.title.toLowerCase().includes(queryString.toLowerCase())
  );
  const sortedMovies = sortMovies(filteredMovies, sortByValue);

  return {
    type: actionTypes.SEARCH_CHANGED,
    displayedMovies: sortedMovies,
    searchFilterValue: queryString.toLowerCase(),
  };
};

export const movieSorter = (sortBy, prevDisplayedMovies) => {
  return {
    type: actionTypes.SORT_MOVIES,
    displayedMovies: sortMovies(prevDisplayedMovies, sortBy),
    sortByValue: sortBy,
  };
};
