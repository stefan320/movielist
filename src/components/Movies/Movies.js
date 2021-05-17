import React from "react";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import Movie from "../Movie/Movie";

const Movies = (props) => (
  <div>
    {props.displayedMovies
      ? props.displayedMovies.map((movie) => (
          <Link
            to={{
              pathname: `preview:${movie.title}`,
              trailer: movie.trailer,
            }}
            key={uniqid()}
          >
            <Movie movieInfo={movie} />
          </Link>
        ))
      : null}
  </div>
);

export default Movies;
