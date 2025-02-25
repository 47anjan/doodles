"use client";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NavItemLabel } from "./header";

import { ReactNode, useState } from "react";

import SearchRecipes from "./search-recipes";
import { twMerge } from "tailwind-merge";
import SearchIngredients from "./search-ingredients";
const SearchBox = () => {
  const [open, setOpen] = useState(false);
  const [isRecipes, setIsRecipes] = useState(true);
  const dialogClose = () => setOpen(!open);
  const openRecipes = () => setIsRecipes(true);
  const openIngredients = () => setIsRecipes(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex group items-center gap-2">
          <Search
            size={20}
            className="transition-all group-focus:stroke-orange group-hover:stroke-orange"
          />

          <NavItemLabel>Search</NavItemLabel>
        </div>
      </DialogTrigger>
      <DialogContent className="min-h-96 gap-2 rounded-lg">
        <div className="flex h-fit flex-row items-center gap-3">
          <TabButton
            className={twMerge(isRecipes && "bg-orange text-white")}
            onClick={openRecipes}
          >
            Recipes
          </TabButton>
          <TabButton
            className={twMerge(!isRecipes && "bg-orange text-white")}
            onClick={openIngredients}
          >
            Ingredients
          </TabButton>
        </div>
        {isRecipes ? (
          <SearchRecipes dialogClose={dialogClose} />
        ) : (
          <SearchIngredients dialogClose={dialogClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};
export default SearchBox;

interface TabButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const TabButton = ({ children, className, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={twMerge(
      "px-4 py-1 bg-white border-2 text-black rounded-md  transition-all duration-300 text-sm font-medium border-orange",
      className
    )}
  >
    {children}
  </button>
);
