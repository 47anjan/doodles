import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHealthColor(value: number) {
  if (value > 80) {
    return "text-lime-500";
  } else if (value < 50) {
    return "text-rose-500";
  } else {
    return "text-amber-500";
  }
}
