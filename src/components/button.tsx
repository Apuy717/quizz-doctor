import { FC } from "react";
import { iButtonWithLoading } from "./button.interface";

export const ButtonWithLoading: FC<iButtonWithLoading> = (props) => {
  return (
    <button
      disabled={props.isLoading}
      type="submit"
      className={`${props.className} ${
        props.isLoading ? `bg-[white] text-[#613ED0] border border-[#613ED0] cursor-not-allowed` : `bg-[#613ED0] text-white`
      } font-semibold w-[30%] ml-2 p-2 rounded-md focus:outline-none relative flex items-center justify-center`}
    >
      <span
        className={`animate-ping absolute top-0 right-0 inline-flex h-3 w-3 rounded-full bg-[#613ED0] opacity-75 ${
          props.isLoading ? `visible` : `invisible`
        }`}
      ></span>
      {props.title}
    </button>
  );
};
