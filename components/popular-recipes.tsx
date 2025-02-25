"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RecipeCard from "./RecipeCard";
import usePopularRecipes from "@/hooks/usePopularRecipes";

const PopularRecipes = () => {
  const { recipes, isError, isLoading, error } = usePopularRecipes();

  if (isError) {
    console.log(error);
    return null;
  }

  return (
    <section className="max-w-[1036px] mx-auto px-4  pb-10">
      <Carousel
        opts={{
          align: "center",
          dragFree: true,
          loop: true,
        }}
      >
        <header className="flex items-center justify-between ">
          <h2 className="font-bold text-xl sm:text-2xl">Community Favorites</h2>
          <div className="flex items-center relative gap-2">
            <CarouselPrevious className="absolute -translate-x-8 right-0" />
            <CarouselNext className="absolute right-0" />
          </div>
        </header>
        <div className="mt-5">
          <CarouselContent className="px-4 gap-8">
            {isLoading ? (
              <>
                {Array(3)
                  .fill("")
                  .map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3 "
                    >
                      <div>loading</div>
                    </CarouselItem>
                  ))}
              </>
            ) : (
              <>
                {recipes?.map((recipe) => (
                  <CarouselItem
                    key={recipe.id}
                    className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3 "
                  >
                    <RecipeCard recipe={recipe} />
                  </CarouselItem>
                ))}
              </>
            )}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  );
};
export default PopularRecipes;
