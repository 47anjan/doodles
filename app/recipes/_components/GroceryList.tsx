"use client";

import { generateGroceryList, GroceryListSchema } from "@/lib/actions";
import { useCallback, useState } from "react";
import { useUser } from "@clerk/nextjs";

export interface GroceryIngredient {
  id: number;
  original: string;
  originalName: string;
}

export interface GroceryListProps {
  ingredients: GroceryIngredient[];
  recipeId: number;
  title: string;
}

export const GroceryList = ({
  ingredients = [],
  recipeId,
  title,
}: GroceryListProps) => {
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const [groceryList, setGroceryList] = useState<GroceryListSchema | null>(
    null
  );
  const handleGenerateList = useCallback(async () => {
    if (!groceryList) {
      try {
        setLoading(true);
        const result = await generateGroceryList(ingredients);
        setGroceryList(result);
      } catch (error) {
        console.error("Failed to generate grocery list:", error);
      } finally {
        setLoading(false);
      }
    }
    setShowList(true);
  }, [ingredients, groceryList]);

  const toggleListVisibility = () => {
    if (showList) {
      setShowList(false);
    } else {
      handleGenerateList();
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={toggleListVisibility}
        disabled={loading}
        className={`px-4 py-2 bg-primary text-white rounded-lg transition-colors font-medium ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"
        }`}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </div>
        ) : showList ? (
          "Hide Grocery List"
        ) : (
          "Generate Grocery List"
        )}
      </button>

      {showList && groceryList && (
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold mb-4">Grocery List</h3>
            {/* {user && (
              <GroceryListStatus
                title={title}
                ingredients={groceryList}
                userId={user.id}
                recipeId={recipeId}
              />
            )} */}
          </div>
          <ul className="space-y-3">
            {groceryList.map((ingredient, index) => (
              <li
                key={ingredient.id || index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-gray-700 capitalize">
                  {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
