"use client";

import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import useInfiniteSearch from "@/hooks/useInfiniteSearch";
import { SearchIngredient, SearchRecipe } from "@/lib/types";
import IngredientCard from "@/components/IngredientCard";
import CuisineCard from "@/components/CuisineCard";

interface Params {
  searchParams: {
    query: string;
    type: "ingredients" | "recipes";
  };
}

const SearchPage = ({ searchParams }: Params) => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteSearch({
    query: searchParams.query,
    type: searchParams.type,
  });

  const allResults = data?.pages.flatMap((page) => page.results) || [];

  if ((data && "code" in data && data.code === 402) || isError) {
    return (
      <div className="max-w-[1036px] mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center">
          <Image src="/empty.avif" width={271} height={256} alt="" />
          <h5 className="mt-6 font-semibold text-[#535665]">
            Your daily points limit of 150 has been reached.
          </h5>
        </div>
      </div>
    );
  }

  if (allResults.length === 0 && !isLoading) {
    return (
      <section
        style={{
          height: "calc(100vh - 80px)",
        }}
        className="max-w-[1036px] mx-auto px-4 py-8 flex flex-col justify-center items-center gap-10"
      >
        <Image
          width={238}
          height={238}
          alt="search not found"
          src={"/location_unserviceable.avif"}
        />
        <h5 className="text-2xl text-slate-800 font-bold">
          {searchParams.type === "recipes"
            ? "☹ No Recipes Results Found!"
            : "☹ No Ingredients Results Found!"}
        </h5>
      </section>
    );
  }

  return (
    <section className="max-w-[1036px] mx-auto px-4 py-8">
      <div className="mt-8 gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <>
            {Array(8)
              .fill("")
              .map((_, index) => (
                <div key={index}>
                  <Skeleton className="w-full rounded-2xl h-[208px]" />
                </div>
              ))}
          </>
        ) : (
          <>
            {searchParams.type === "recipes"
              ? allResults.map((recipe) => (
                  <CuisineCard
                    key={recipe.id}
                    recipe={recipe as SearchRecipe}
                  />
                ))
              : allResults.map((ingredient) => (
                  <IngredientCard
                    key={ingredient.id}
                    ingredient={ingredient as SearchIngredient}
                  />
                ))}
          </>
        )}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="w-full max-w-72 h-12 hover:bg-orange hover:text-white transition-colors duration-300 mx-auto"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default SearchPage;
