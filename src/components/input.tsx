import { FC, useState } from "react";
import { iInput } from "./input.interface";
import { BiErrorCircle } from "react-icons/bi";

export const Input: FC<iInput> = (props) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <div className={`${props.className} relative flex-1 pl-2 pr-2`}>
      <label
        htmlFor={props.id}
        className={`text-sm absolute bg-white transition-all duration-500  ${
          isFocus || props.value.length >= 1 ? `-top-3` : `top-3`
        }  left-4 text-gray-500`}
      >
        {props.label}
      </label>
      <input
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        id={props.id}
        type="text"
        name={props.name}
        autoComplete="off"
        className="focus:outline-none p-2 border-2 focus:border-[#613ED0] rounded-md text-gray-500 w-full"
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      />
      <div className={`text-red-500 mr-2 flex flex-row items-center text-sm normal-case ${props.error === null ? `hidden` : `block`}`}>
        <BiErrorCircle className="mr-1" />
        <p>{props.error}</p>
      </div>
    </div>
  );
};

export const TextTextarea: FC<iInput> = (props) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <div className={`${props.className} relative flex-1 pl-2 pr-2`}>
      <label
        htmlFor={props.id}
        className={`text-sm absolute bg-white transition-all duration-500  ${
          isFocus || props.value.length >= 1 ? `-top-3` : `top-3`
        }  left-4 text-gray-500`}
      >
        {props.label}
      </label>
      <textarea
        rows={4}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        id={props.id}
        name={props.name}
        autoComplete="off"
        className="focus:outline-none p-2 border-2 focus:border-[#613ED0] rounded-md text-gray-500 w-full"
        onChange={(e) => props.onChange(e.target.value)}
        defaultValue={props.value}
      ></textarea>
      <div className={`text-red-500 mr-2 flex flex-row items-center text-sm normal-case ${props.error === null ? `hidden` : `block`}`}>
        <BiErrorCircle className="mr-1" />
        <p>{props.error}</p>
      </div>
    </div>
  );
};
