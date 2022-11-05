import { Howl } from "howler";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { toast } from "react-toastify";
import { Modal } from "../components/modal";
import { WheelComponent } from "../components/wheelComponent";
import { AnswerContext } from "../contexts/answerContext";
import question from "../dao/question";

const Home: NextPage = () => {
  const [page, setPage] = useState<number>(0);
  const [modal, setModal] = useState<{ icon: any; msg: string; status: boolean }>({ icon: "", msg: "", status: false });
  const { push } = useRouter();
  const [sound] = useState<Howl>(new Howl({ src: ["/audio/button-3.mp3"] }));
  const [soundWheel] = useState<Howl>(new Howl({ src: ["/audio/spin-wheel.mp3"] }));
  const [soundSuccess] = useState<Howl>(new Howl({ src: ["/audio/success.mp3"] }));
  const [soundFailed] = useState<Howl>(new Howl({ src: ["/audio/failed.mp3"] }));
  const [soundGift] = useState<Howl>(new Howl({ src: ["/audio/gift-win.mp3"] }));

  const { answer, setAnswer, gift, setGift, email } = useContext(AnswerContext);
  const handleAns = (
    keyQuestion: string,
    valQuestion: string,
    keyAns: string,
    valAns: string,
    answerTrue: string | null
  ) => {
    sound.play();
    if (answerTrue !== null) {
      if (keyAns === answerTrue) {
        soundSuccess.play();
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
        return;
      }
      //handle jawaban salah
      soundFailed.play();
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
          <div className="animate-pulse p-4 rounded-full border-2 text-[5rem] border-red-500 mb-4">
            <AiOutlineClose className="text-red-500" />
          </div>
        ),
        msg: "Salah",
        status: true,
      });
      return;
    }

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
    setPage((page) => page + 1);
  };

  //============================================= Gift helper ======================================================
  //payung 50%
  //tumbler 20%
  //headset 20%
  const items = [
    { text: "Payung", img: "/img/payung.png" },
    { text: "Tumbler", img: "/img/botol.png" },
    { text: "Payung", img: "/img/payung.png" },
    { text: "Headset", img: "/img/headset.png" },

    { text: "Payung", img: "/img/payung.png" },
    { text: "Tumbler", img: "/img/botol.png" },
    { text: "Headset", img: "/img/headset.png" },

    { text: "Headset", img: "/img/headset.png" },
    { text: "Payung", img: "/img/payung.png" },
    { text: "Tumbler", img: "/img/botol.png" },
    { text: "Payung", img: "/img/payung.png" },

    { text: "Tumbler", img: "/img/botol.png" },
    { text: "Payung", img: "/img/payung.png" },
    { text: "Headset", img: "/img/headset.png" },

    { text: "Payung", img: "/img/payung.png" },
    { text: "Tumbler", img: "/img/botol.png" },
    { text: "Tumbler", img: "/img/botol.png" },

    { text: "Payung", img: "/img/payung.png" },
    { text: "Tumbler", img: "/img/botol.png" },
    { text: "Payung", img: "/img/payung.png" },

    { text: "Payung", img: "/img/payung.png" },
    { text: "Headset", img: "/img/headset.png" },
    { text: "Tumbler", img: "/img/botol.png" },
  ];

  const [modalGift, setModalGift] = useState<{ status: boolean; msg: string; img: string }>({
    status: false,
    msg: "",
    img: "/",
  });

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const selectItem = () => {
    if (selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * items.length);
      setGift(items[selectedItem].text);
      soundWheel.play();
      setTimeout(() => {
        const g = items[selectedItem];
        setModalGift({ status: true, msg: `Yeeee Anda mendapatkan ${g.text}`, img: g.img });
        soundWheel.stop();
        soundGift.play();
      }, 4100);

      setSelectedItem(selectedItem);
    } else {
      // setSelectedItem(null);
    }
  };
  //======================================== End Gift helper  ========================================//

  //======================================== Start Gift Component ========================================//
  if (page >= 8) {
    return (
      <div
        className="h-screen w-screen flex flex-col items-center xl:justify-start justify-center bg-spin-mobile md:bg-spin-desktop bg-cover"
        style={{ backgroundSize: "100% 100%" }}
      >
        <Modal status={modalGift.status}>
          <div className="h-[10rem] w-[10rem] mb-2 relative">
            <Image src={`${modalGift.img}`} width="100%" height={"100%"} layout="fill" objectFit="contain" />
          </div>
          <p className="my-4 font-bold">{modalGift.msg}</p>
          <button
            className="bg-[#8E3DF4] text-white rounded p-2 mb-5"
            onClick={() => {
              soundSuccess.play();
              toast("Selamat hadiah berhasil di claim");
              setModalGift({ ...modalGift, status: false });
              const sendAnswer = {
                email: email,
                answer: answer,
                gift: gift,
              };
              console.log("send data to db", sendAnswer);
              setTimeout(() => {
                push("https://ve.virtualevent.id/hybrid/pit_ika_nutricia/lobby");
              }, 5000);
            }}
          >
            Claim
          </button>
        </Modal>
        <div className="md:mt-[4%] scale-[.65] sm:scale-[.70] md:scale-100">
          <WheelComponent items={items} selectItem={selectItem} selectedItem={selectedItem} />
        </div>
      </div>
    );
  }
  //======================================== End Gift Component ========================================//

  //======================================== Start Question Component ========================================//
  if (page >= 1) {
    return (
      <div className="bg-white h-screen w-screen bg-question-mobile overflow-y-auto md:overflow-y-hidden md:bg-question-desktop bg-cover bg-no-repeat bg-center flex flex-col items-center px-5 relative">
        <div className="h-auto w-full flex flex-row justify-end md:m-0">
          <div className="w-24 h-24 md:h-32 md:w-32 relative">
            <Image src={`/img/logo.png`} height="100%" width="100%" layout="responsive" objectFit="cover" />
          </div>
        </div>
        <div className={`bg-white p-4 md:px-10 md:pb-10 w-full md:w-[50%] shadow-2xl rounded-xl relative z-50`}>
          <div className="h-12 w-12 bg-[#8662BD] absolute -top-5 left-[45%] rounded-full shadow-2xl"></div>
          <div className="bg-[#2A3257] text-white rounded-md p-4 mt-10">
            <p>
              {page}. {question.question[page].question}
            </p>
          </div>
          {question.question[page].listAnswer.map((i, k) => (
            <div
              key={k}
              className={`cursor-pointer text-xs md:text-md text-center mt-4 p-2 border border-[#2A3257] lg:hover:bg-[#2A3257] lg:hover:text-white rounded-md`}
              onClick={() =>
                handleAns(`${page}`, question.question[page].question, i.key, i.value, question.question[page].answer)
              }
            >
              <p>
                <strong className="uppercase">{i.key}.</strong> {i.value}
              </p>
            </div>
          ))}
        </div>

        {/*==================================== start ilustration @mobile-only ====================================*/}
        <div className="flex flex-row w-full justify-between mt-5 fixed bottom-16 px-6">
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
        <Modal status={modal.status}>
          {modal.icon}
          <p className="animate-pulse">{modal.msg}</p>
          <button
            className="my-4 h-12 w-32 bg-button bg-cover bg-center bg-no-repeat"
            style={{ backgroundSize: "100%, 100%" }}
            onClick={() => {
              sound.play();
              setPage((page) => page + 1);
              setModal({ ...modal, status: false });
            }}
          ></button>
        </Modal>
        {/*==================================== end modal notification ====================================*/}
      </div>
    );
  }
  //======================================== End Question Component ========================================//

  //======================================== Start Home Component ========================================//
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-question-mobile md:bg-question-desktop bg-cover bg-center relative">
      <div className="w-full md:w-[25%] h-auto relative -mt-40 animate-[wiggle_3s_ease-in-out_infinite]">
        <Image src={`/img/logo.png`} height="100%" width="100%" layout="responsive" objectFit="cover" />
      </div>
      <div className="flex flex-row z-10">
        <div className="flex flex-col items-center justify-center mr-5">
          <button
            onClick={() => {
              setPage(1);
              sound.play();
            }}
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
            onClick={() => sound.play()}
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
    </div>
  );
  //======================================== End Home Component ========================================//
};

export default Home;
