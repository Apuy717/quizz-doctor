import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CiWarning } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
import { Modal } from "../components/modal";
import { AnswerContext } from "../contexts/answerContext";
import question from "../dao/question";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page: number | null = query.pg ? parseInt(`${query.pg}`) : null;
  if (page === null) throw new Error("error query required");
  return {
    props: { page },
  };
};

const Question: NextPage<{ page: number }> = ({ page }) => {
  const [modal, setModal] = useState<{ icon: any; msg: string; status: boolean }>({ icon: "", msg: "", status: false });
  const { answer, setAnswer } = useContext(AnswerContext);
  const { push } = useRouter();

  const historyAnswer = answer.find((f) => f.keyQuestion === `${page}`);

  const handleAns = (
    keyQuestion: string,
    valQuestion: string,
    keyAns: string,
    valAns: string,
    answerTrue: string | null
  ) => {
    if (historyAnswer) {
      if (historyAnswer.keyAnswer === keyAns) {
        if (page <= 6) {
          push(`/question?pg=${page + 1}`);
        } else {
          push(`/gift`);
        }
      } else {
        setModal({
          icon: (
            <div className="animate-pulse p-4 rounded-full border-2 text-[5rem] border-yellow-400 mb-4">
              <CiWarning className="text-yellow-400" />
            </div>
          ),
          msg: "Jawaban tidak boleh diganti...",
          status: true,
        });
      }
    } else {
      if (keyAns === answerTrue) {
        setAnswer([
          ...answer,
          {
            keyQuestion: keyQuestion,
            valueQuestion: valQuestion,
            keyAnswer: keyAns,
            valueAnswer: valAns,
            statusAnswer: true,
          },
        ]);
        setModal({
          icon: (
            <div className="animate-pulse p-4 rounded-full border-2 text-[5rem] border-green-500 mb-4">
              <GiCheckMark className="text-green-500" />
            </div>
          ),
          msg: "Benarrrr",
          status: true,
        });
      } else {
        setAnswer([
          ...answer,
          {
            keyQuestion: keyQuestion,
            valueQuestion: valQuestion,
            keyAnswer: keyAns,
            valueAnswer: valAns,
            statusAnswer: null,
          },
        ]);
        if (page <= 6) {
          push(`/question?pg=${page + 1}`);
        } else {
          push(`/gift`);
        }
      }
    }
  };

  return (
    <div className="bg-white h-screen w-screen bg-question-mobile overflow-y-auto md:overflow-y-hidden md:bg-question-desktop bg-cover bg-no-repeat bg-center flex flex-col items-center px-5 relative">
      <div className="h-auto w-full flex flex-row justify-end md:m-0">
        <div className="w-24 h-24 md:h-32 md:w-32 relative">
          <Image src={`/img/logo.png`} height="100%" width="100%" layout="responsive" objectFit="cover" />
        </div>
      </div>
      <div
        className={`bg-white p-4 mb-20 md:px-10 md:pb-10 w-full md:w-[50%] shadow-2xl rounded-xl relative ${
          page === 4 ? `md:-mt-5` : `mt-10 md:mt-10`
        }`}
      >
        <div className="h-12 w-12 bg-[#8662BD] absolute -top-5 left-[45%] rounded-full shadow-2xl"></div>
        <div className="bg-[#2A3257] text-white rounded-md p-4 mt-10">
          <p>
            {page}. {question.question[page - 1].question}
          </p>
        </div>
        {question.question[page - 1].listAnswer.map((i, k) => (
          <div
            key={k}
            className={`${
              historyAnswer?.keyAnswer === i.key ? `bg-[#8662BD] text-white` : ``
            } cursor-pointer text-xs md:text-md text-center mt-4 p-2 border border-[#2A3257] hover:bg-[#2A3257] hover:text-white rounded-md`}
            onClick={() =>
              handleAns(
                `${page}`,
                question.question[page - 1].question,
                i.key,
                i.value,
                question.question[page - 1].answer
              )
            }
          >
            <p>
              <strong className="uppercase">{i.key}.</strong> {i.value}
            </p>
          </div>
        ))}
      </div>

      {/*==================================== start ilustration @mobile-only ====================================*/}
      <div className="h-[7rem] w-14 absolute bottom-[10%] right-[10%] bg-family bg-cover bg-center md:hidden"></div>
      <div className="h-[7rem] w-14 absolute bottom-[10%] left-[10%] bg-doctor bg-cover bg-center md:hidden"></div>
      {/*==================================== end ilustration @mobile-only ====================================*/}

      {/*==================================== start footer @desktop-only ====================================*/}
      <div
        className="w-full h-[15%] absolute bottom-0 hidden md:inline-flex bg-footer bg-contain bg-repeat-round"
        style={{ backgroundSize: "100%, 100%" }}
      ></div>
      {/*==================================== start footer @desktop-only ====================================*/}

      {/*==================================== start modal notification ====================================*/}
      <Modal status={modal.status}>
        {modal.icon}
        <p className="animate-pulse">{modal.msg}</p>
        <button
          className="my-4 h-12 w-32 bg-button bg-cover bg-center bg-no-repeat"
          style={{ backgroundSize: "100%, 100%" }}
          onClick={() => {
            if (page <= 6) {
              push(`/question?pg=${page + 1}`);
            } else {
              push(`/gift`);
            }
            setModal({ ...modal, status: false });
          }}
        ></button>
      </Modal>
      {/*==================================== end modal notification ====================================*/}
    </div>
  );
};

export default Question;
