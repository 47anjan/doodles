import Image from "next/image";

const Hero = () => {
  return (
    <section className="pt-4 md:pt-0 lg:h-[300px] w-full bg-hero rounded-b-3xl">
      <div className="px-4 max-w-[1036px] mx-auto flex items-center flex-col md:flex-row">
        <div className="flex-1 pt-10 md:pt-0">
          <h1 className="text-5xl font-semibold text-center md:text-start leading-none  text-[#3b3d48]">
            Explore Your <br /> Best Recipe
          </h1>
          <div className="flex  justify-center md:justify-start pt-4 md:pt-0">
            <svg
              width="120"
              height="10"
              viewBox="0 0 78 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.25939C27 -0.240624 53.5 -0.2406 77 4.25939"
                stroke="#F15700"
                strokeWidth="1.5"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex-1 ">
          <Image
            className="w-full"
            src="/hero.webp"
            width={501}
            height={300}
            alt="Hero Image"
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
