import { FC, useState } from "react";

export const Modal: FC<{ children: any; status: boolean }> = ({ children, status }) => {
  return (
    <div
      className={`fixed w-screen h-screen top-0 flex items-center justify-center modals z-50 ${
        status ? `inline-flex` : `hidden`
      }`}
    >
      <div className="bg-black w-full h-full absolute opacity-75" />
      <div className="pt-10 bg-white h-min w-[90%] md:w-[40%] opacity-100 top-0 z-50 rounded-md shadow-2xl flex items-center justify-center flex-col">
        {children}
      </div>
    </div>
  );
};
