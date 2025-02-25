import { API_KEY, BASE_URL } from "@/lib/constants";
import { SearchResult } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface QueryResponse {
  results: SearchResult[];
}

interface SearchProps {
  query?: string;
  type?: "ingredients" | "recipes";
}

const useSearch = ({ query, type }: SearchProps) => {
  const fetchRecipes = fetch(
    `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=20`
  ).then((res) => res.json());
  const fetchIngredients = fetch(
    `${BASE_URL}/food/ingredients/search?apiKey=${API_KEY}&query=${query}&number=20`
  ).then((res) => res.json());

  const getData = () => (type === "recipes" ? fetchRecipes : fetchIngredients);

  return useQuery<QueryResponse>({
    queryKey: ["cuisines", query],
    queryFn: getData,
    staleTime: 1 * 60000,
  });
};
export default useSearch;
