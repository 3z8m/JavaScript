import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// クラス名を結合し、重複を排除するために使用
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
