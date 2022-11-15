import { motion } from "framer-motion";
import { Howl } from "howler";
import Image from "next/image";
import { FC, useState } from "react";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { FaHandPointUp, FaPlay } from "react-icons/fa";
import Question from "../dao/question";
import { iHomeComponent } from "./home.interface";
import { Modal } from "./modal";

export const HomeComponent: FC<iHomeComponent> = ({ page, onPlay, onAbout }) => {
  const [isAbout, setIsAbout] = useState<boolean>(false);
  const [sound] = useState<Howl>(new Howl({ src: ["/audio/button-3.mp3"] }));

  const closeAbout = () => {
    setIsAbout(false);
    sound.play();
  };

  return (
    <motion.div
      key={page}
      exit={{ opacity: 0 }}
      className="h-screen w-screen flex flex-col items-center justify-center bg-question-mobile md:bg-question-desktop bg-cover bg-center relative"
    >
      <div className="w-full md:w-[25%] h-auto relative -mt-40 animate-[wiggle_3s_ease-in-out_infinite]">
        <Image src={`/img/logo.png`} height="100%" width="100%" layout="responsive" objectFit="cover" />
      </div>
      <div className="-mt-10 z-50 px-5 w-full md:w-[40%]">
        <p className="text-center text-red-700 font-bold">
          Survey dan quiz ini berdasarkan materi yang berada di learning booth. Jika anda belum membacanya, silahkan
          mengunjungi learning booth!
        </p>
      </div>
      <div className="flex flex-row z-10 mt-4">
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
            onClick={() => {
              setIsAbout(!isAbout);
              sound.play();
            }}
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
      <Modal status={isAbout}>
        <div className="flex flex-col items-center justify-center pb-10" onClick={closeAbout}>
          <div className="bg-white rounded-md m-5 shadow-2xl border relative">
            <div className="absolute left-0 -top-5 w-full flex items-center justify-center">
              <div className="w-10 h-10 bg-[#8662BD] shadow-2xl rounded-full" />
            </div>
            <div className="bg-[#2A3257] text-white mx-4 rounded-md p-4 mt-10 text-xs font-semibold md:text-md flex flex-row">
              <p>1. {Question.question[0].question}</p>
            </div>
            {Question.question[1].listAnswer.map((i, k) => (
              <div
                key={k}
                className={`relative mx-4 text-xs md:text-md text-center mt-4 p-2 border border-[#2A3257] rounded-md`}
              >
                <p>
                  <strong className="uppercase">{i.key}.</strong> {i.value}
                </p>
                {k === 0 ? (
                  <FaHandPointUp className="absolute top-4 w-10 z-50 h-10 right-10 -rotate-45 text-[#2B3358]" />
                ) : (
                  <></>
                )}
              </div>
            ))}
            <div className="bg-black text-white mt-5 p-2 text-xs font-semibold rounded-b-md">
              <p>
                Pilihlah salah satu jawaban yang tersedia dengan menekan tombol seperti yang ditunjukan cursor diatas di
                atas.
              </p>
            </div>
          </div>
          <button className="bg-red-600 hover:bg-red-700 rounded text-xs p-2 text-white" onClick={closeAbout}>
            Tutup
          </button>
        </div>
      </Modal>
    </motion.div>
  );
};
