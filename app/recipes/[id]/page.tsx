import { badgeVariants } from "@/components/ui/badge";
import { API_KEY, BASE_URL } from "@/lib/constants";
import { RecipeDetails } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import FavoriteStatus from "../_components/FavoriteStatus";
import { currentUser } from "@clerk/nextjs/server";
import RecipeChat from "@/components/RecipeChat";

const getRecipeInformation = cache(
  async (id: string): Promise<RecipeDetails> => {
    return fetch(
      `${BASE_URL}/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
    ).then((res) => res.json());
  }
);

interface Params {
  params: {
    id: string;
  };
}

const RecipeInformation = async ({ params }: Params) => {
  const recipe = await getRecipeInformation(params.id);
  const user = await currentUser();

  const saveRecipe = {
    recipeId: recipe.id,
    userId: user?.id,
    image: recipe.image,
    title: recipe.title,
  };

  if (recipe && "code" in recipe && recipe.code === 402) {
    return (
      <div className="max-w-[1036px] mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center">
          <Image src="/empty.avif" width={271} height={256} alt="" />
          <h5 className="mt-6 font-semibold  text-[#535665]">
            Your daily points limit of 150 has been reached.
          </h5>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-[1036px] mx-auto px-4 py-8">
      <div className="">
        <div className="mb-4">
          <header className="flex gap-2 items-center justify-between flex-wrap">
            <h1 className="text-2xl font-bold mb-4 ">{recipe.title}</h1>
            {user ? <FavoriteStatus {...saveRecipe} /> : null}
          </header>
          <div className="flex gap-2 items-center">
            {recipe?.cuisines?.map((item, i) => (
              <Link className={badgeVariants()} href={`#`} key={i}>
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <Image
              width={600}
              height={600}
              loading="lazy"
              className="w-full rounded"
              src={recipe.image}
              alt={recipe.title}
            />
          </div>
          <div className="flex-1">
            <div
              className="prose mx-auto lg:prose-xl "
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            ></div>
            <div className="flex py-2 justify-evenly flex-wrap">
              <div className=" flex flex-col  bg-white  w-fit p-4 items-center justify-center gap-1">
                <Image
                  width={500}
                  height={500}
                  src={`https://spoonacular.com/application/frontend/images/badges/cheap.svg`}
                  className="rounded-xl object-cover h-10 w-10"
                  alt=""
                />
                <p className="text-sm mb-2 font-medium ">
                  ${(recipe.pricePerServing / 100).toFixed(2)} per serving
                </p>
              </div>

              <div className=" flex flex-col  bg-white  w-fit p-4 items-center justify-center gap-1">
                <Image
                  width={500}
                  height={500}
                  src={`https://spoonacular.com/application/frontend/images/badges/fast.svg`}
                  className="rounded-xl object-cover h-10 w-10"
                  alt=""
                />
                <p className="text-sm mb-2 font-medium ">
                  Ready in {recipe.readyInMinutes} minutes
                </p>
              </div>

              <div className=" flex flex-col  bg-white  w-fit p-4 items-center justify-center gap-1">
                <Image
                  width={500}
                  height={500}
                  src={`https://spoonacular.com/application/frontend/images/badges/popular.svg`}
                  className="rounded-xl object-cover h-10 w-10"
                  alt=""
                />
                <p className="text-sm mb-2 font-medium ">
                  {recipe.aggregateLikes} likes
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2 mt-4">Ingredients</h2>
        <ul className="mb-4 flex flex-wrap items-center justify-center ">
          {recipe.extendedIngredients?.map((ingredient, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden flex flex-col  bg-white cursor-pointer max-w-[200px]"
            >
              <Link href={`/ingredients/${ingredient.id}`} className="p-2 ">
                <Image
                  width={500}
                  height={500}
                  src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`}
                  className="rounded-xl object-cover w-full h-full"
                  alt=""
                />
              </Link>

              <div className=" pl-3 p-3 text-text1 flex flex-col justify-center">
                <p className="text-sm mb-2 font-medium text-center">
                  {ingredient.original}
                </p>
              </div>
            </div>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <ul className="bg-gray-100 mb-6">
          {recipe?.analyzedInstructions[0]?.steps.map((instruction, index) => (
            <li key={index} className=" rounded flex p-4  h-full items-start">
              <span className="text-indigo-500 font-bold text-lg flex-shrink-0 mr-4">
                {instruction.number}
              </span>
              <span className="font-medium">{instruction.step}</span>
            </li>
          ))}
        </ul>

        <h5 className="text-2xl md:text-3xl pl-3 my-2 border-l-4  font-sans font-bold border-teal-400  text-gray-700">
          🥗 Serve the recipe with your favorite frosting or enjoy it plain!
        </h5>
      </div>
      <div>
        <RecipeChat recipe={recipe} />
      </div>
    </section>
  );
};
export default RecipeInformation;
