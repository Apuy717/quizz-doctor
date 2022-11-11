import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Modal } from "./modal";

export const WheelComponent: FC<{
  items: { text: string; img: string }[];
  selectItem: () => void;
  selectedItem: number | null;
}> = ({ items, selectItem, selectedItem }) => {
  const wheelVars: any = {
    "--nb-item": items.length,
    "--selected-item": selectedItem,
  };
  const spinning = selectedItem !== null ? "spinning" : "";
  const segColors = [
    "#212F76",
    "#8E3DF4",
    "#B42A77",
    "#212F76",
    "#8E3DF4",
    "#B42A77",
    "#212F76",
    "#8E3DF4",
    "#B42A77",
    "#212F76",
    "#8E3DF4",
    "#B42A77",
    "#212F76",
    "#8E3DF4",
    "#B42A77",
    "#212F76",
    "#8E3DF4",
    "#B42A77",
    "#212F76",
    "#8E3DF4",
    "#B42A77",
    "#212F76",
    "#8E3DF4",
    "#B42A77",
    "#212F76",
    "#8E3DF4",
    "#B42A77",
    "#212F76",
    "#8E3DF4",
    "#B42A77",
  ];

  return (
    <div className="wheel-container relative">
      <div className="w-[2rem] h-[2rem] absolute -right-2 top-[47%] bg-panah bg-cover rotate-180 z-50"></div>
      <div className={`wheel ${spinning}`} style={wheelVars} onClick={selectItem}>
        {items.map((i, key) => {
          let idx: any = { "--item-nb": key, "--neutral-color": segColors[key] };
          return (
            <div className="wheel-item font-semibold" key={key} style={idx}>
              <div className="flex justify-end items-center flex-row">
                <div className="h-8 w-8 mr-3 rotate-90 origin-center">
                  <Image src={i.img} width="100%" height={"100%"} layout="fill" objectFit="contain" />
                </div>
                <p className="text-white rotate-180 text-xs">{i.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
