import { Badge } from "@/components/ui/badge";
import { API_KEY, BASE_URL } from "@/lib/constants";
import { IngredientDetails } from "@/lib/types";
import Image from "next/image";
import { cache } from "react";

const getIngredientInformation = cache(
  async (id: string): Promise<IngredientDetails> => {
    return fetch(
      `${BASE_URL}/food/ingredients/${id}/information?amount=1&apiKey=${API_KEY}`
    ).then((res) => res.json());
  }
);

const getIngredient = cache(async (id: string) => {
  return await getIngredientInformation(id);
});

interface Params {
  params: {
    id: string;
  };
}

const IngredientInformation = async ({ params }: Params) => {
  const ingredient = await getIngredient(params.id);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center md:flex-row gap-8 items-center mb-8">
          <Image
            width={500}
            height={500}
            src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`}
            className="rounded-xl  object-cover max-w-xs w-full h-full"
            alt=""
          />

          <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 md:gap-4 md:flex-col ">
            <article>
              <h2 className="text-2xl font-bold  capitalize">
                {ingredient.name}
              </h2>
              <div className="mb-4">
                <p className="text-gray-700">
                  Amount: {ingredient.amount} {ingredient.unit}
                </p>
                <p className="text-gray-700">
                  Estimated Cost: $
                  {(ingredient.estimatedCost.value / 100).toFixed(2)}
                </p>
                <p className="text-gray-700">
                  Consistency: {ingredient.consistency}
                </p>
                <p className="text-gray-700">Aisle: {ingredient.aisle}</p>
              </div>
            </article>

            <article>
              <h3 className="text-lg font-bold mb-2">Properties:</h3>
              <ul>
                {ingredient.nutrition.properties.map((property) => (
                  <li key={property.name} className="text-gray-700">
                    {property.name}: {property.amount.toFixed(2)}{" "}
                    {property.unit}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 font-semibold">
                Per Serving:{" "}
                <span>
                  {ingredient.nutrition.weightPerServing.amount}
                  {ingredient.nutrition.weightPerServing.unit}
                </span>
              </p>
            </article>
          </div>
        </div>

        <div className="flex   items-center gap-2">
          {ingredient.categoryPath.map((item, index) => (
            <Badge className="capitalize" key={index}>
              {item}
            </Badge>
          ))}
        </div>

        <section className="mt-8">
          <article>
            <h3 className="text-lg  font-bold mb-2">Nutrition:</h3>
            <ul className="">
              {ingredient.nutrition.nutrients.map((nutrient) => (
                <li key={nutrient.name} className="text-gray-700 text-lg">
                  {nutrient.name}: {nutrient.amount} {nutrient.unit}
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </div>
  );
};
export default IngredientInformation;
