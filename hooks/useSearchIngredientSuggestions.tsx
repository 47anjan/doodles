import { API_KEY, BASE_URL } from "@/lib/constants";
import { SearchIngredientSuggestion } from "@/lib/types";
import { useEffect, useState } from "react";

type Success = {
  state: "success";
  data: SearchIngredientSuggestion[];
};
type Error = {
  state: "error";
  error: { message: string };
};

type Initial = {
  state: "initial";
};

type Loading = {
  state: "loading";
};

type State = Success | Error | Loading | Initial;

const useSearchIngredientSuggestions = (searchQuery: string) => {
  const [status, setStatus] = useState<State>({ state: "initial" });

  const getSearchSuggestion = async () => {
    try {
      setStatus({ state: "loading" });
      const res = await fetch(
        `${BASE_URL}/food/ingredients/autocomplete?query=${searchQuery}&number=10&apiKey=${API_KEY}`
      );
      const result = await res.json();
      setStatus({ state: "success", data: result });
    } catch (error) {
      setStatus({
        state: "error",
        error: {
          message: "Something went wrong",
        },
      });
      console.error(error);
    }
  };

  useEffect(() => {
    if (!searchQuery) return;

    let timer = setTimeout(() => {
      if (!searchQuery) {
        return;
      }
      getSearchSuggestion();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return status;
};
export default useSearchIngredientSuggestions;
