import { AnimatePresence, motion } from "framer-motion";
import { Howl } from "howler";
import type { NextPage } from "next";
import Image from "next/image";
import { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { toast } from "react-toastify";
import { HomeComponent } from "../components/homeComponent";
import { Modal } from "../components/modal";
import { QuestionComponent } from "../components/questionComponent";
import { WheelComponent } from "../components/wheelComponent";
import { AnswerContext } from "../contexts/answerContext";
import question from "../dao/question";

const Home: NextPage = () => {
  const [page, setPage] = useState<number>(0);
  const [modal, setModal] = useState<{ icon: any; msg: string; status: boolean }>({ icon: "", msg: "", status: false });
  const [sound] = useState<Howl>(new Howl({ src: ["/audio/button-3.mp3"] }));
  const [soundWheel] = useState<Howl>(new Howl({ src: ["/audio/spin-wheel.mp3"] }));
  const [soundSuccess] = useState<Howl>(new Howl({ src: ["/audio/success.mp3"] }));
  const [soundFailed] = useState<Howl>(new Howl({ src: ["/audio/failed.mp3"] }));
  const [soundGift] = useState<Howl>(new Howl({ src: ["/audio/gift-win.mp3"] }));
  const { answer, setAnswer, gift, setGift, email, setEmail } = useContext(AnswerContext);

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
          msg: "Jawaban Anda benar",
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
        msg: `Jawaban anda belum tepat, jawaban yang benar adalah : (${answerTrue.toUpperCase()}. ${
          question.question[page - 1].listAnswer.find((f) => f.key === answerTrue)?.value
        }`,
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
        setModalGift({ status: true, msg: `Selamat Anda mendapatkan ${g.text}`, img: g.img });
        soundWheel.stop();
        soundGift.play();
      }, 4100);

      setSelectedItem(selectedItem);
    } else {
      // setSelectedItem(null);
    }
  };
  //======================================== End Gift helper  ========================================//

  //======================================== API helper  ========================================//
  const [loading, setLoading] = useState<boolean>(false);
  const submitAnswer = async () => {
    const body = {
      tbl_t_events_id: 28,
      email: email,
      gift: gift,
      answer: answer,
    };
    await fetch("https://be.virtualevent.id/api/game/insert", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res?.email) {
          toast("Terimakasih telah mengikuti kuis Nutricia");
          setEmail("");
          setAnswer([]);
          setGift("");
          setIsClaim(false);
          setModalGift({ ...modalGift, status: false });
          setLoading(false);
        }
        if (res.message) {
          if (res?.message.includes("Email tidak ditemukan")) {
            toast.error(
              `Email yang anda masukan tidak sesuai dengan buku tamu, pastikan anda telah mengisi buku tamu.!`
            );
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        toast.error(`failed, something went wrong`);
        setLoading(false);
      });
  };

  const preSubmitAnswer = async () => {
    setLoading(true);
    if (email.length === 0) {
      setInputEmailErr("Email tidak boleh kosong");
      return;
    }
    await fetch(`https://be.virtualevent.id/api/game?email=${email}&tbl_t_events_id=28`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.email) {
          setLoading(false);
          toast.warning("Anda telah mengikuti kuis ini sebelumnya");
          setModalGift({ ...modalGift, status: false });
        }

        if (res.message) {
          if (res.message.includes("Data tidak ditemukan")) {
            submitAnswer();
          }
        }
      })
      .catch((err) => {
        toast.error("failed, something went wrong!!");
        setLoading(false);
      });
  };

  //======================================== End API helper  ========================================//

  //======================================== Claim helper  ========================================//
  const [isClaim, setIsClaim] = useState<boolean>(false);
  const [inputEmailErr, setInputEmailErr] = useState<string>("");
  const validateInputEmail = (e: string) => {
    setEmail(e);
    if (!e) {
      setInputEmailErr("Email required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)) {
      setInputEmailErr("Format email tidak valid");
    } else {
      setInputEmailErr("");
    }
  };
  //======================================== End Claim helper  ========================================//

  return (
    <AnimatePresence exitBeforeEnter>
      {page === 0 ? (
        //======================================== Start Home Component ========================================//
        <HomeComponent
          key={page}
          page={page}
          onPlay={() => {
            setPage(1);
            sound.play();
          }}
          onAbout={() => {
            sound.play();
          }}
        />
      ) : //======================================== End Home Component ========================================//
      page <= 7 ? (
        //======================================== Start Question Component ========================================//
        <QuestionComponent
          key={page}
          page={page}
          question={question.question}
          onAnswer={(i) => {
            handleAns(
              `${page - 1}`,
              question.question[page - 1].question,
              i.key,
              i.value,
              question.question[page - 1].answer
            );
          }}
        >
          <Modal status={modal.status}>
            {modal.icon}
            <p className="animate-pulse mx-4">
              {modal.msg.split("(")[0]}
              <span className="font-bold">{modal.msg.split("(").length >= 2 ? modal.msg.split("(")[1] : ``}</span>
            </p>

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
        </QuestionComponent>
      ) : (
        //======================================== End Question Component ========================================//
        //======================================== Start Gift Component ========================================//
        <motion.div
          key={page}
          exit={{ opacity: 0 }}
          className="noselect h-screen w-screen flex flex-col overflow-y-hidden items-center xl:justify-start justify-center bg-spin-mobile md:bg-spin-desktop bg-cover"
          style={{ backgroundSize: "100% 100%" }}
        >
          <Modal status={modalGift.status}>
            <div className="h-[10rem] w-[10rem] mb-2 relative">
              <Image src={`${modalGift.img}`} width="100%" height={"100%"} layout="fill" objectFit="contain" />
            </div>
            <p className="my-4 font-bold text-center">{modalGift.msg}</p>
            <div
              className={`mb-10 w-full px-4 flex flex-row items-center justify-center relative ${
                isClaim ? `` : `hidden`
              }`}
            >
              <p className="absolute -bottom-5 left-4 text-xs text-red-500">{inputEmailErr}</p>
              <input
                autoFocus
                type="email"
                placeholder="Email"
                className="border focus:outline-none p-2 mr-2 rounded flex-1 focus:border-[#8E3DF4]"
                onChange={(e) => validateInputEmail(e.target.value)}
              />
              <button
                className={`bg-[#8E3DF4] text-white rounded p-2 text-center flex items-center justify-center`}
                onClick={() => {
                  if (!loading) {
                    soundSuccess.play();
                    preSubmitAnswer();
                  }
                }}
              >
                {loading ? <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mx-2" /> : `Claim`}
              </button>
            </div>
            <button
              className={`bg-[#8E3DF4] text-white rounded p-2 mb-5 ${isClaim ? `hidden` : `block`}`}
              onClick={() => {
                soundSuccess.play();
                setIsClaim(true);
              }}
            >
              Claim
            </button>
          </Modal>
          <div className="md:mt-[4%] scale-[.65] sm:scale-[.70] md:scale-100">
            <WheelComponent items={items} selectItem={selectItem} selectedItem={selectedItem} />
          </div>
        </motion.div>
        //======================================== End Gift Component ========================================//
      )}
    </AnimatePresence>
  );
};

export default Home;
