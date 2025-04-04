import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatedDate(data: moment.MomentInput) {
  if (!moment(data).isValid()) {
    return "N/A";
  }
  if (moment(data).diff(moment()) > 5) {
    return moment(data).format("YYYY-MM-DD HH:mm:ss");
  }
  return moment(data).fromNow();
}
