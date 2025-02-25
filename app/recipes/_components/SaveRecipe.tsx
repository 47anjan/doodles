"use client";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";
import { toast } from "@/components/ui/use-toast";

interface Props {
  recipeId: number;
  userId?: string;
  image: string;
  title: string;
}

const SaveRecipe = (recipe: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/favorite", {
        ...recipe,
      });

      router.refresh();
      toast({
        title: "Successfully save your post",
        variant: "default",
      });
    } catch (error) {
      console.log(error);

      setIsLoading(false);
      toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleSave}
      title="Save this recipe"
      variant="outline"
      size="icon"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
        </>
      ) : (
        <>
          <Heart />
        </>
      )}
    </Button>
  );
};
export default SaveRecipe;
