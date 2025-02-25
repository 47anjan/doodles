"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";
import { toast } from "@/components/ui/use-toast";

interface Props {
  id: number;
}

const FavoriteRecipeRemoveButton = ({ id }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete("/api/favorite/" + id);
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
      onClick={handleDelete}
      disabled={isLoading}
      size="sm"
      variant="destructive"
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
        </>
      ) : (
        <>Remove</>
      )}
    </Button>
  );
};
export default FavoriteRecipeRemoveButton;
