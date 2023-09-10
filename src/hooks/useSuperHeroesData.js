import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // cacheTime: 5000 default value is 5 min
    // staleTime: 30000, // default value is 0 sec
    //   refetchOnMount: true,
    // refetchOnWindowFocus: true,
    enabled: false,
    onSuccess,
    onError,
  });
};
