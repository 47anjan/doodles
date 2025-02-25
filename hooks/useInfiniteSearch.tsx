import { API_KEY, BASE_URL } from "@/lib/constants";
import { SearchResult } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";

interface QueryResponse {
  results: SearchResult[];
  totalResults: number;
}

interface SearchProps {
  query?: string;
  type?: "ingredients" | "recipes";
}

const useInfiniteSearch = ({ query, type }: SearchProps) => {
  return useInfiniteQuery<QueryResponse>({
    queryKey: ["search", query, type],
    queryFn: async ({ pageParam = 1 }) => {
      const offset = ((pageParam as number) - 1) * 20;
      const endpoint =
        type === "recipes"
          ? "recipes/complexSearch"
          : "food/ingredients/search";

      const response = await fetch(
        `${BASE_URL}/${endpoint}?apiKey=${API_KEY}&query=${query}&number=20&offset=${offset}`
      );
      if (!response.ok) throw new Error("Network error");
      return response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetchedItems = allPages.length * 20;
      return fetchedItems < lastPage.totalResults
        ? allPages.length + 1
        : undefined;
    },
    enabled: !!query,
    staleTime: 60000,
  });
};

export default useInfiniteSearch;
