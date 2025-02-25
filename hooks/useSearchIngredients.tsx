import { API_KEY, BASE_URL } from "@/lib/constants";
import { SearchIngredient } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface QueryResponse {
  results: SearchIngredient[];
}

const useSearchIngredients = (query: string) => {
  const getData = () => {
    return fetch(
      `${BASE_URL}/food/ingredients/search?apiKey=${API_KEY}&query=${query}&number=20`
    ).then((res) => res.json());
  };

  return useQuery<QueryResponse>({
    queryKey: ["cuisines", query],
    queryFn: getData,
    staleTime: 1 * 60000,
  });
};
export default useSearchIngredients;
