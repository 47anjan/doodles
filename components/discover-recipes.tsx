"use client";

import RecipeCard from "./RecipeCard";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { Button } from "./ui/button";
import useInfiniteRandomRecipes from "@/hooks/useInfiniteRandomRecipes";

const DiscoverRecipes = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRandomRecipes();

  const allRecipes = data?.pages.flatMap((page) => page.recipes) || [];

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

  return (
    <section className="max-w-[1036px] mx-auto px-4 pb-10">
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-xl sm:text-2xl">Discover recipes</h2>
      </header>

      <div className="mt-5 gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <>
            {Array(8)
              .fill("")
              .map((_, index) => (
                <div key={index}>
                  <Skeleton className="w-full mb-3 rounded-2xl h-[208px]" />
                  <Skeleton className="w-full mb-2 h-[20px]" />
                  <Skeleton className="w-full h-[16px] mb-1" />
                  <Skeleton className="w-full h-[12px]" />
                </div>
              ))}
          </>
        ) : (
          <>
            {allRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
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

export default DiscoverRecipes;
