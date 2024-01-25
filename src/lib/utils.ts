import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Colours } from './colours';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type VariantPrefix = "ghost" | "solid";
type ButtonVariant = `${VariantPrefix}-peach` | `${VariantPrefix}-aqua` | `${VariantPrefix}-purple` | null | undefined;

export function setVariantAndColour(colour: string, variant?: VariantPrefix): ButtonVariant{
  if (variant) {
    if (colour === Colours.SecondaryPeach) {
      return `${variant}-peach`;
    } else if (colour === Colours.SecondaryAqua) {
      return `${variant}-aqua`;
    } else {
      return `${variant}-purple`;
    }
  } else {
    if (colour === Colours.SecondaryPeach) {
      return 'ghost-peach';
    } else if (colour === Colours.SecondaryAqua) {
      return 'ghost-aqua';
    } else {
      return 'ghost-purple';
    }
  }
}
