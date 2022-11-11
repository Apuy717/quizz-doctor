import { AnimatePresence, motion } from "framer-motion";
import { Howl } from "howler";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { toast } from "react-toastify";
import { HomeComponent } from "../components/homeComponent";
import { Modal } from "../components/modal";
import { QuestionComponent } from "../components/questionComponent";
import { WheelComponent } from "../components/wheelComponent";
import { AnswerContext } from "../contexts/answerContext";
import question from "../dao/question";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id: string | null = query.id ? `${query.id}` : null;
  return {
    props: { id },
  };
};

const Home: NextPage<{ id: string | null }> = ({ id }) => {
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
  const [isRejected, setIsRejected] = useState<{ err: string; status: boolean }>({ err: "Loading...", status: true });
  const submitAnswer = async () => {
    setLoading(true);
    soundSuccess.play();
    const body = {
      tbl_t_events_id: 28,
      id: id,
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
        if (res.email) {
          toast("Terimakasih telah mengikuti kuis Nutricia");
          setModalGift({ status: false, msg: "", img: "/" });
          setAnswer([]);
          setGift("");
          setLoading(false);
        }
        if (res.message) {
          if (res.message.includes("ID tidak ditemukan")) {
            toast.warning("Silahkan isi buku tamu terlebih dahulu, pastikan query url yang anda masukan telah sesuai");
            setAnswer([]);
            setGift("");
            setModalGift({ status: false, msg: "", img: "/" });
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
    await fetch(`https://be.virtualevent.id/api/game/user/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
        if (res.id) {
          setIsRejected({ err: "", status: false });
        }

        if (res.message) {
          if (res.message.includes("Anda sudah mengisi data game!")) {
            toast.warning("Anda sudah mengisi data game!");
            setIsRejected({ err: "Anda sudah mengisi data game!", status: true });
          }
          if (res.message.includes("Data tidak ditemukan")) {
            toast.warning(
              "Data user tidak ditemukan, silahkan isi buku tamu terlebih dahulu atau periksa kembali query url anda"
            );
            setIsRejected({
              err: "Data user tidak ditemukan, silahkan isi buku tamu terlebih dahulu atau periksa kembali query url anda",
              status: true,
            });
          }
          if (res.message.includes("Attempt to read property")) {
            toast.warning("Failed, something went wrong!");
            setIsRejected({ err: "Failed, something went wrong!", status: true });
          }
        }
      })
      .catch((err) => {
        toast.error("failed, something went wrong!!");
      });
  };

  useEffect(() => {
    preSubmitAnswer();
  }, []);

  //======================================== End API helper  ========================================//
  return (
    <AnimatePresence exitBeforeEnter>
      {page === 0 ? (
        //======================================== Start Home Component ========================================//
        <HomeComponent
          key={page}
          page={page}
          onPlay={() => {
            sound.play();
            if (!isRejected.status) {
              setPage(1);
            } else {
              toast.warning(isRejected.err);
            }
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
            <button className={`bg-[#8E3DF4] text-white rounded p-2 mb-5`} onClick={submitAnswer}>
              {loading ? <AiOutlineLoading3Quarters className="animate-spin mx-4" /> : "Claim"}

              {/* Claim */}
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
