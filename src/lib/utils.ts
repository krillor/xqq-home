import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'success': return 'bg-green-100 text-green-800';
    default: return 'bg-orange-100 text-orange-800';
  }
}

export function getStatusText(status: string, foundLabel = '已找到', searchingLabel = '寻找中') {
  switch (status) {
    case 'success': return foundLabel;
    default: return searchingLabel;
  }
}
