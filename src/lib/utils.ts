import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openModal(id: string) {
  const modal = document.getElementById(id);
  if (modal) {
    (modal as HTMLDialogElement).showModal();
  }
}
