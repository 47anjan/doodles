import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { categories } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  return (
    <section className="max-w-[1036px] mx-auto px-4 pt-8">
      <Carousel
        opts={{
          align: "center",
          dragFree: true,
        }}
      >
        <header className="flex items-center justify-between ">
          <h2 className="font-bold text-xl sm:text-2xl">Whats on your mind?</h2>
          <div className="flex items-center relative gap-2">
            <CarouselPrevious className="absolute -translate-x-8 right-0" />
            <CarouselNext className="absolute right-0" />
          </div>
        </header>
        <div className="mt-5">
          <CarouselContent className="-ml-2 ">
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="pl-1 basis-1/2  sm:basis-1/4 md:basis-1/5 "
              >
                <Link
                  href={`/search?query=${category.name}&type=recipes`}
                  className="flex justify-center"
                >
                  <Image
                    src={category.image}
                    height={180}
                    width={144}
                    className="h-[160px] w-[140px] md:h-[180px] md:w-[144] object-cover"
                    alt={category.label}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  );
};
export default Categories;
