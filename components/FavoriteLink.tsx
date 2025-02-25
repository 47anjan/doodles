import Link from "next/link";
import { NavItemLabel } from "./header";

const FavoriteLink = () => {
  return (
    <Link href="/dashboard/favorite" className="flex group items-center gap-2">
      <span className="relative block isolate">
        <svg
          className="group-focus:text-orange group-hover:text-orange fill-green group-focus:fill-orange group-hover:fill-orange transition-all"
          viewBox="-1 0 37 32"
          height="24"
          width="24"
        >
          <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
        </svg>
        <span className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          0
        </span>
      </span>
      <NavItemLabel>Favorite</NavItemLabel>
    </Link>
  );
};
export default FavoriteLink;
