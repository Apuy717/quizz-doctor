import { MdLastPage } from "react-icons/md";
import { FC } from "react";

export const TitlePage: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex flex-row items-center mb-[2rem]">
      <MdLastPage className="mr-3 text-xl" />
      <p className="text-2xl">{title}</p>
    </div>
  );
};
