import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import {useSuperHeroesData} from "../hooks/useSuperHeroesData";

// const fetchSuperHeroes = () => {
//   return axios.get("http://localhost:4000/superheroes");
// };

const onSuccess = (data) => {
  console.log("Perform side effect after success", data);
}

const onError = (error) => {
  console.log("Perform side effect after failure", error)
}

export const RQSuperHeroesPage = () => {
  const { isLoading, isError, error, data, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)
  
  // useQuery(
  //   "super-heroes",
  //   fetchSuperHeroes,
  //   {
  //     // cacheTime: 5000 default value is 5 min
  //     // staleTime: 30000, // default value is 0 sec
  //     //   refetchOnMount: true,
  //     // refetchOnWindowFocus: true,
  //     enabled: false,
  //     onSuccess,
  //     onError
  //   }
  // );

  //By adding explicit staleTime, we will able to reduce network request

  //If there is refresh button, we want to show the loader, we can use `isFetching` for the same.

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error?.message}</h2>;
  //For manually triggering the fetch, we use `refetch` function from useQuery.
  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero?.id}>{hero.name}</div>;
      })}
    </>
  );
};
