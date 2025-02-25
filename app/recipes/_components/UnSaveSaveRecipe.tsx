"use client";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";
import { toast } from "@/components/ui/use-toast";

interface Props {
  recipeId: number;
}

const UnSaveSaveRecipe = ({ recipeId }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete("/api/favorite/" + recipeId);
      router.refresh();
      toast({
        description: "Your post has been unsave.",
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Something went wrong.",
        description: "Your post was not unsave. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      title="Remove this recipe from favorite "
      variant="outline"
      size="icon"
      disabled={isLoading}
      onClick={handleDelete}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
        </>
      ) : (
        <>
          <Heart className="fill-pink-500 text-pink-500" />
        </>
      )}
    </Button>
  );
};
export default UnSaveSaveRecipe;
