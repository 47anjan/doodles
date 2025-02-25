import Categories from "@/components/categories";
import DiscoverRecipes from "@/components/discover-recipes";
import Divider from "@/components/divider";
import Hero from "@/components/hero";
import PopularRecipes from "@/components/popular-recipes";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <Divider />
      <PopularRecipes />
      <Divider />
      <DiscoverRecipes />
    </main>
  );
}
