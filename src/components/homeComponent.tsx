import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { iHomeComponent } from "./home.interface";

export const HomeComponent: FC<iHomeComponent> = ({ page, onPlay, onAbout }) => {
  return (
    <motion.div
      key={page}
      exit={{ opacity: 0 }}
      className="h-screen w-screen flex flex-col items-center justify-center bg-question-mobile md:bg-question-desktop bg-cover bg-center relative"
    >
      <div className="w-full md:w-[25%] h-auto relative -mt-40 animate-[wiggle_3s_ease-in-out_infinite]">
        <Image src={`/img/logo.png`} height="100%" width="100%" layout="responsive" objectFit="cover" />
      </div>
      <div className="flex flex-row z-10">
        <div className="flex flex-col items-center justify-center mr-5">
          <button
            onClick={onPlay}
            className="transition-all duration-100 hover:scale-105 rounded-full h-min w-min p-5 shadow-xl bg-[#663976] flex items-center justify-center text-white"
          >
            <FaPlay className="h-[1rem] w-[1srem]" />
          </button>
          <p className="font-extrabold text-transparent text-md bg-clip-text bg-gradient-to-b from-red-700 to-[#3D0E55] ">
            Bermain
          </p>
        </div>
        <div className="flex flex-col items-center justify-center ml-5">
          <button
            onClick={onAbout}
            className="rounded-full h-min w-min p-5 bg-[#663976] transition-all duration-100 hover:scale-105 flex items-center justify-center text-white"
          >
            <BsQuestionDiamondFill className="h-[1rem] w-[1srem]" />
          </button>
          <p className="font-extrabold text-transparent text-md bg-clip-text bg-gradient-to-b from-red-700 to-[#3D0E55]">
            Petunjuk
          </p>
        </div>
      </div>
      <div
        className="w-full h-[15%] absolute bottom-0 hidden md:inline-flex bg-footer bg-contain bg-repeat-round"
        style={{ backgroundSize: "100%, 100%" }}
      ></div>
    </motion.div>
  );
};
