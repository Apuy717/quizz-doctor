import type { NextPage } from "next";
import { WheelComponent } from "../components/wheelComponent";
import { useState, useContext } from "react";
import { Modal } from "../components/modal";
import Image from "next/image";
import { toast } from "react-toastify";
import { AnswerContext } from "../contexts/answerContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Gift: NextPage = () => {
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

  const { gift, setGift, answer, email } = useContext(AnswerContext);

  const [modal, setModal] = useState<{ status: boolean; msg: string; img: string }>({
    status: false,
    msg: "",
    img: "/",
  });

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const selectItem = () => {
    if (selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * items.length);
      setGift(items[selectedItem].text);
      setTimeout(() => {
        const gift = items[selectedItem];
        setModal({ status: true, msg: `Yeeee Anda mendapatkan ${gift.text}`, img: gift.img });
      }, 4100);

      setSelectedItem(selectedItem);
    } else {
      setSelectedItem(null);
    }
  };

  const { push } = useRouter();
  const content = {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div
      variants={content}
      animate="animate"
      initial="initial"
      exit={{ opacity: 0 }}
      className="h-screen w-screen flex flex-col items-center xl:justify-start justify-center bg-spin-mobile md:bg-spin-desktop bg-cover"
      style={{ backgroundSize: "100% 100%" }}
    >
      <Modal status={modal.status}>
        <div className="h-[10rem] w-[10rem] mb-2 relative">
          <Image src={`${modal.img}`} width="100%" height={"100%"} layout="fill" objectFit="contain" />
        </div>
        <p className="my-4 font-bold">{modal.msg}</p>
        <button
          className="bg-[#8E3DF4] text-white rounded p-2 mb-5"
          onClick={() => {
            toast("Selamat hadiah berhasil di claim");
            setModal({ ...modal, status: false });
            console.log("email", email);
            console.log("answer", answer);
            console.log("gift", gift);
            setTimeout(() => {
              push("/");
            }, 5000);
          }}
        >
          Claim
        </button>
      </Modal>
      <div className="md:mt-[4%] scale-[.65] sm:scale-[.70] md:scale-100">
        <WheelComponent items={items} selectItem={selectItem} selectedItem={selectedItem} />
      </div>
    </motion.div>
  );
};

export default Gift;
