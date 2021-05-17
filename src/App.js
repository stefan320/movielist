import { connect } from "react-redux";
import React, { useEffect } from "react";
import * as actionCreator from "./store/actions";
import FilterMenu from "./components/FilterMenu/FilterMenu";
import Movies from "./components/Movies/Movies";
import MoviePreview from "./components/MoviePreview/MoviePreview";
import styled from "styled-components";
import { withRouter, Route, Switch } from "react-router-dom";

const PageContainer = styled.div`
  color: ${({ theme }) => theme.colors.tertiary};
  background-color: ${({ theme }) => theme.colors.secondary};
  display: block;
`;

const App = (props) => {
  useEffect(() => {
    props.onPageInit(props.history.location.search);
  }, []);

  useEffect(() => {
    // IF any of the filters / sorting changed update query params
    if (props.filtersTouched) {
      console.log(props.searchFilter);
      const params = {
        searchFilter: props.searchFilter,
        genres: props.activeFilters,
        order: props.sortByValue,
      };
      let searchParams = new URLSearchParams(params);
      props.history.push({ search: searchParams.toString() });
    }
  }, [props.searchFilter, props.activeFilters, props.sortByValue]);

  // const movies = props.displayedMovies
  //   ? props.displayedMovies.map((movie) => (
  //       <Link to={"/preview"}>
  //         <Movie key={uniqid()} movieInfo={movie} />
  //       </Link>
  //     ))
  //   : null;

  return (
    <PageContainer>
      <FilterMenu
        inputChangedHandler={(filterName) => {
          props.filtersChanged(
            filterName,
            props.activeFilters,
            props.searchFilter,
            props.sortByValue
          );
        }}
        searchChangedHandler={(search) => {
          props.searchByString(search, props.activeFilters, props.sortByValue);
        }}
        selectMenuHandler={(value) => {
          return props.sortBy(value, props.displayedMovies);
        }}
        sortByValue={props.sortByValue}
        selectedGenres={props.activeFilters}
        searchFilterValue={props.searchFilter}
      />
      <Switch>
        <Route
          path="/preview:trailerLink"
          component={(props) => (
            <MoviePreview videoUrl={props.history.location.trailer} />
          )}
        />
        <Route path="/">
          <Movies displayedMovies={props.displayedMovies} />
        </Route>
      </Switch>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  const movieData = {
    displayedMovies: state.displayedMovies,
    activeFilters: state.activeFilters,
    searchFilter: state.searchFilterValue,
    sortByValue: state.sortBy,
    filtersTouched: state.filtersTouched,
  };
  return movieData;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageInit: (searchQuery) =>
      actionCreator.initMovieList(dispatch, searchQuery),
    filtersChanged: (changedFilter, filtersArr, searchString, sortByValue) =>
      dispatch(
        actionCreator.filterMovieList(
          changedFilter,
          filtersArr,
          searchString,
          sortByValue
        )
      ),

    searchByString: (string, activeFilters, sortByValue) =>
      dispatch(
        actionCreator.updateSearchResults(string, activeFilters, sortByValue)
      ),

    sortBy: (value, displayedMovies) =>
      dispatch(actionCreator.movieSorter(value, displayedMovies)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
