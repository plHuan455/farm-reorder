import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export type CNInputs = ClassValue[]

export function cn(...inputs: CNInputs) {
  return twMerge(clsx(inputs)) || undefined
}