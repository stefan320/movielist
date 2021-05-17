import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  padding: 2.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.quinary};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.tertiary};

  & img {
    max-width: 182px;
  }
`;

const MovieInfo = styled.div`
  margin: 0.6rem 0;

  & :last-of-type {
    margin-bottom: 0;
  }
`;

export const Movie = ({ movieInfo }) => (
  <MovieContainer>
    <img src={movieInfo.thumbnail} alt={movieInfo.title} />
    <h2>{movieInfo.title}</h2>
    <div>
      <MovieInfo>Year: {movieInfo.releaseDate}</MovieInfo>
      <MovieInfo>Rating: {movieInfo.rating}</MovieInfo>
      <MovieInfo>Genre: {movieInfo.genre}</MovieInfo>
    </div>
  </MovieContainer>
);

export default Movie;
