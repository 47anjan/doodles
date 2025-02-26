"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { GroceryListSchema } from "@/lib/actions";

interface GroceryListStatusProps {
  recipeId: number;
  ingredients: GroceryListSchema;
  title: string;
}

const SaveGroceryList = ({
  recipeId,
  ingredients,
  title,
}: GroceryListStatusProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();

  const groceryList = {
    userId: user?.id,
    recipeId,
    ingredients,
    title,
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/grocery-list", {
        ...groceryList,
      });

      router.refresh();
      setIsLoading(false);
      toast({
        title: "Successfully saved your grocery list",
        variant: "default",
      });
    } catch (error) {
      console.log(error);

      setIsLoading(false);
      toast({
        title: "Something went wrong.",
        description: "Your grocery list was not saved. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleSave}
      className="bg-green gap-1 transition-colors duration-300 text-white"
      disabled={isLoading}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      Add to GroceryList
    </Button>
  );
};
export default SaveGroceryList;
