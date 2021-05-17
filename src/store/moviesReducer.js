import * as actionTypes from "./actionTypes";

const initialState = {
  displayedMovies: null,
  query: "",
  searchFilterValue: "",
  activeFilters: [],
  sortBy: "rating",
  filtersTouched: false,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_APP:
      return {
        ...state,
        displayedMovies: [...action.topEightMovies],
      };

    case actionTypes.INIT_APP_WITH_QUERY:
      console.log(action);
      return {
        ...state,
        displayedMovies: [...action.displayedMovies],
        searchFilterValue: action.searchFilter,
        sortBy: action.order,
        activeFilters: action.genres ? [...action.genres] : [],
      };
    case actionTypes.FILTER_CHANGED:
      return {
        ...state,
        activeFilters: [...action.filtersArr],
        displayedMovies: [...action.displayedMovies],
        filtersTouched: true,
      };

    case actionTypes.SEARCH_CHANGED:
      return {
        ...state,
        ...state.activeFilters,
        displayedMovies: [...action.displayedMovies],
        searchFilterValue: action.searchFilterValue,
        filtersTouched: true,
      };
    case actionTypes.SORT_MOVIES:
      return {
        ...state,
        ...state.activeFilters,
        displayedMovies: [...action.displayedMovies],
        sortBy: action.sortByValue,
        filtersTouched: true,
      };
    default:
      return state;
  }
};

export default moviesReducer;
