import { MouseEventHandler } from "react";

export interface iButton {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export interface iButtonWithLoading extends iButton {
  isLoading: boolean;
}
