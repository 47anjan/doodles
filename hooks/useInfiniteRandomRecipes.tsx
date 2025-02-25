import { API_KEY, BASE_URL } from "@/lib/constants";
import { Recipe } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";

interface QueryResponse {
  recipes: Recipe[];
}

const useInfiniteRandomRecipes = () => {
  return useInfiniteQuery<QueryResponse>({
    queryKey: ["random"],
    queryFn: async ({ pageParam = 1 }) => {
      // PageParam isn't actually used by the API, but we can track batches
      const response = await fetch(
        `${BASE_URL}/recipes/random?number=20&apiKey=${API_KEY}`
      );
      if (!response.ok) throw new Error("Network error");
      return response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Continue fetching until we have 5 batches (150 recipes)
      return allPages.length < 10 ? allPages.length + 1 : undefined;
    },
    staleTime: 60000,
  });
};
export default useInfiniteRandomRecipes;
