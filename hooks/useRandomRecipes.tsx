import { API_KEY, BASE_URL } from "@/lib/constants";
import { Recipe } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface QueryResponse {
  recipes: Recipe[];
}

const useRandomRecipes = () => {
  const getData = () => {
    return fetch(`${BASE_URL}/recipes/random?number=30&apiKey=${API_KEY}`).then(
      (res) => res.json()
    );
  };

  return useQuery<QueryResponse>({
    queryKey: ["random"],
    queryFn: getData,
    staleTime: 1 * 60000,
  });
};
export default useRandomRecipes;
