import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import { BiRegistered } from "react-icons/bi";
import { iQuestionComponent } from "./questionComponent.interface";

export const QuestionComponent: FC<iQuestionComponent> = ({ page, question, onAnswer, children }) => {
  return (
    <motion.div
      key={page}
      exit={{ opacity: 0 }}
      className="bg-white h-screen w-screen bg-question-mobile overflow-y-auto md:overflow-y-hidden md:bg-question-desktop bg-cover bg-no-repeat bg-center flex flex-col items-center px-5 relative"
    >
      <div className="h-auto w-full flex flex-row justify-end md:m-0">
        <div className="w-24 h-24 md:h-32 md:w-32 relative">
          <Image src={`/img/logo.png`} height="100%" width="100%" layout="responsive" objectFit="cover" />
        </div>
      </div>
      <div
        className={`bg-white p-4 md:px-10 md:pb-10 w-full md:w-[50%] shadow-2xl rounded-xl relative z-50 mb-20 ${
          page === 4 || page === 3 ? `` : `mt-10 md:mt-0`
        }`}
      >
        <div className="h-12 w-12 bg-[#8662BD] absolute -top-5 left-[45%] rounded-full shadow-2xl"></div>
        <div className="bg-[#2A3257] text-white rounded-md p-4 mt-10 text-xs font-semibold md:text-md flex flex-row">
          {page === 5 ? (
            <>
              <p>{page}. Apa komposisi dari SYNEO</p>
              <span className="text-[0.4rem] -mt-1">R</span>
              <p>&nbsp;?</p>
            </>
          ) : (
            <></>
          )}
          {page === 6 ? (
            <>
              <p>{page}. SYNEO</p>
              <span className="text-[0.4rem] -mt-1">R</span>
              <p>&nbsp;Terbukti Klinis untuk...</p>
            </>
          ) : (
            <></>
          )}

          {page === 7 ? (
            <>
              <p>{page}. Nutribaby Royal</p>
              <span className="text-[0.4rem] -mt-1">+</span>
              <p>&nbsp;Cesabio...</p>
            </>
          ) : (
            <></>
          )}

          {page !== 5 && page !== 6 && page !== 7 ? (
            <>
              <p>
                {page}. {question[page - 1].question}
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
        {question[page - 1].listAnswer.map((i, k) => (
          <motion.div
            key={k}
            className={`cursor-pointer text-xs md:text-md text-center mt-4 p-2 border border-[#2A3257] lg:hover:bg-[#2A3257] lg:hover:text-white rounded-md`}
            onClick={() => onAnswer(i)}
          >
            <p>
              <strong className="uppercase">{i.key}.</strong> {i.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/*==================================== start ilustration @mobile-only ====================================*/}
      <div className="flex flex-row w-full justify-between mt-5 absolute bottom-16 px-6">
        <div className="h-[7rem] w-14 bg-doctor bg-cover bg-center md:hidden"></div>
        <div className="h-[7rem] w-14 bg-family bg-cover bg-center md:hidden"></div>
      </div>
      {/*==================================== end ilustration @mobile-only ====================================*/}

      {/*==================================== start footer @desktop-only ====================================*/}
      <div
        className="w-full h-[15%] absolute bottom-0 hidden md:inline-flex bg-footer bg-contain bg-repeat-round"
        style={{ backgroundSize: "100%, 100%" }}
      ></div>
      {/*==================================== start footer @desktop-only ====================================*/}

      {/*==================================== start modal notification ====================================*/}
      {children}
      {/*==================================== end modal notification ====================================*/}
    </motion.div>
  );
};
