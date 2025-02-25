import { API_KEY, BASE_URL } from "@/lib/constants";
import { popularRecipesData } from "@/lib/popular-recipes";
import { Recipe } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface QueryResponse {
  recipes: Recipe[];
}

const usePopularRecipes = () => {
  const getData = () => {
    return fetch(
      `${BASE_URL}/recipes/random?number=20&tags=chicken&apiKey=${API_KEY}`
    ).then((res) => res.json());
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: getData,
    staleTime: 86400000, // 24h
    initialData: popularRecipesData,
  });

  const response: QueryResponse = data;

  const recipes = response.recipes.filter((recipe) => recipe.dairyFree);

  return { recipes, isError, isLoading, error };
};
export default usePopularRecipes;
