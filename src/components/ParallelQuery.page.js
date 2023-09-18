import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superHeroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const ParallelQueryPage = () => {
  const {
    data: superHeroes,
    isLoading: loadingSuperHeroes,
    isError: isErrorSuperHeroes,
    error: errorSuperHeroes,
  } = useQuery("superHeroes", fetchSuperHeroes);

  const {
    data: friends,
    isLoading: loadingFriends,
    isError: isErrorFriends,
    error: errorFriends,
  } = useQuery("friends", fetchFriends);

  if (loadingSuperHeroes || loadingFriends) return <div>Loading data...</div>;
  if (isErrorSuperHeroes || isErrorFriends) return <div>{errorSuperHeroes?.message} {errorFriends?.message}</div>;

  return (
    <>
      <h2>RQ Super Heroes</h2>
      {superHeroes?.data.map((hero) => {
        return <div key={hero?.id}>{hero.name}</div>;
      })}

      <h2>RQ Friends</h2>
      {friends?.data.map((hero) => {
        return <div key={hero?.id}>{hero.name}</div>;
      })}
    </>
  );
};
