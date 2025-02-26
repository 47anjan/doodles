import { Button } from "@/components/ui/button";
import SaveGroceryList from "./SaveGroceryList";
import { GroceryListSchema } from "@/lib/actions";
import { useEffect, useState } from "react";

interface GroceryListStatusProps {
  recipeId: number;
  userId: string;
  ingredients: GroceryListSchema;
  title: string;
}

const GroceryListStatus = ({
  recipeId,
  userId,
  title,
  ingredients,
}: GroceryListStatusProps) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/grocery-list/${recipeId}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching grocery list:", error);
      }
    };

    fetchData();
  }, [recipeId, userId]);

  return (
    <div>
      {data ? (
        <Button className="bg-green text-white">Remove Grocery List</Button>
      ) : (
        <SaveGroceryList
          title={title}
          ingredients={ingredients}
          recipeId={recipeId}
        />
      )}
    </div>
  );
};

export default GroceryListStatus;
