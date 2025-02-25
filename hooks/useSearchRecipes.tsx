import { API_KEY, BASE_URL } from "@/lib/constants";
import { SearchRecipe } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface QueryResponse {
  results: SearchRecipe[];
}

const useSearchRecipes = (query: string) => {
  const getData = () => {
    return fetch(
      `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=20`
    ).then((res) => res.json());
  };

  return useQuery<QueryResponse>({
    queryKey: ["cuisines", query],
    queryFn: getData,
    staleTime: 1 * 60000,
  });
};
export default useSearchRecipes;
