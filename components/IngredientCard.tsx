import { SearchIngredient, SearchRecipe } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  ingredient: SearchIngredient;
}

const IngredientCard = ({ ingredient }: Props) => {
  return (
    <Link
      href={`/ingredients/${ingredient.id}`}
      className="rounded-2xl group h-52 overflow-hidden relative isolate"
    >
      <Image
        src={`https://img.spoonacular.com/ingredients_500x500/${ingredient.image}`}
        loading="lazy"
        className="w-full will-change-transform h-[208px] md:group-hover:scale-105  group-hover:brightness-110  transition-all object-cover duration-300 "
        width={312}
        height={208}
        alt=""
      />
      <div
        style={{
          background:
            "linear-gradient(rgba(27, 30, 36, 0) 0%, rgba(27, 30, 36,1) 90%)",
        }}
        className="bg-gradient-to-b  object-cover left-0 right-0 bottom-0 px-2 pb-2 flex items-end z-10 h-20 absolute "
      >
        <h4 className="text-base leading-5  font-medium text-white line-clamp-2">
          {ingredient.name}
        </h4>
      </div>
    </Link>
  );
};
export default IngredientCard;
