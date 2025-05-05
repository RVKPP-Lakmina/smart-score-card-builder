import axios from "axios";
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

export const arraysAreEqualAsSets = (a: string[], b: string[]) => {
  return (
    a.length === b.length &&
    new Set(a).size === new Set(b).size &&
    a.every((item) => b.includes(item))
  );
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
