import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmptyFavorite from "./_components/EmptyFavorite";
import prisma from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import FavoriteRecipeCard from "@/components/FavoriteRecipeCard";

const FavoritePage = async () => {
  const user = await currentUser();
  const recipes = await prisma.favoriteRecipe.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (
    <div>
      <section className="grid items-center gap-8 pb-8 pt-6 md:py-8 overflow-hidden">
        <PageHeader>
          <PageHeaderHeading className="flex items-center gap-2" size="sm">
            <div>
              <div className="flex group text-lg items-center gap-2">
                <span className="relative block isolate">
                  <svg
                    className="group-focus:text-orange group-hover:text-orange fill-green group-focus:fill-orange group-hover:fill-orange transition-all"
                    viewBox="-1 0 37 32"
                    height="40"
                    width="40"
                  >
                    <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                  </svg>
                  <span className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    {recipes.length}
                  </span>
                </span>
              </div>
            </div>
            Favorite
          </PageHeaderHeading>
          <PageHeaderDescription size="sm">
            Manage your favorite recipes
          </PageHeaderDescription>
        </PageHeader>
        <ScrollArea className="w-full pb-3.5">
          {recipes.length === 0 ? (
            <EmptyFavorite />
          ) : (
            <div>
              <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {recipes.map((recipe) => (
                  <FavoriteRecipeCard {...recipe} key={recipe.id} />
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </section>
    </div>
  );
};
export default FavoritePage;
