import Image from "next/image";

const EmptyFavorite = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src="/empty.avif" width={271} height={256} alt="" />
      <h5 className="mt-6 font-semibold text-xl text-[#535665]">
        Your favorite list is empty
      </h5>
      <p className="mt-2 text-[#7e808c]">
        You can go to home page to view some recipes
      </p>
      <button className="mt-[30px] text-sm transition-all bg-orange hover:bg-opacity-95 sm:text-base px-5 h-10 flex justify-center items-center text-white uppercase font-semibold">
        Cuisines that you may like
      </button>
    </div>
  );
};
export default EmptyFavorite;
