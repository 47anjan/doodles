import { Recipe } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group grid gap-3 origin-center will-change-transform hover:scale-95 transition-all"
    >
      <div className="rounded-2xl h-52 overflow-hidden relative isolate">
        <Image
          src={recipe?.image}
          loading="lazy"
          className="w-full h-[208px] group-hover:brightness-105 transition-all object-cover "
          width={312}
          height={208}
          alt=""
        />
        <div
          // style={{
          //   background:
          //     "linear-gradient(rgba(27, 30, 36, 0) 0%, rgba(27, 30, 36,.5) 84.21%)",
          // }}
          className="bg-gradient-to-b  object-cover left-0 right-0 bottom-0 z-10 h-20 absolute "
        ></div>
      </div>
      <div>
        <h3 className="text-lg mb-[2px] line-clamp-2 font-bold leading-6 text-slate-800">
          {recipe.title}
        </h3>
        <div className="text-base mb-1 font-semibold leading-5 text-slate-700">
          Cooking Time: <span>{recipe.readyInMinutes} Minutes</span>
        </div>
        <div className="text-base line-clamp-1 leading-5 text-slate-700">
          {recipe.diets.join(", ")}
        </div>
      </div>
    </Link>
  );
};
export default RecipeCard;
