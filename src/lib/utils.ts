import { clsx, type ClassValue } from "clsx";
import { format, formatRelative, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const converToNormalDate = (date: string) => {
  return format(parseISO(date), "yyyy-MMM-dd");
};

export const converToRelativeDate = (date: string) => {
  return formatRelative(parseISO(date), new Date());
};

