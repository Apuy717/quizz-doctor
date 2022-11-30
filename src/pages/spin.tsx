import { Howl } from "howler";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { Modal } from "../components/modal";
import { WheelComponent } from "../components/wheelComponent";

const Spin: NextPage = () => {
  const [soundWheel] = useState<Howl>(new Howl({ src: ["/audio/spin-wheel.mp3"] }));
  const [soundGift] = useState<Howl>(new Howl({ src: ["/audio/gift-win.mp3"] }));
  const [loading, setLoading] = useState<boolean>(false);
  const [modalGift, setModalGift] = useState<{ status: boolean; msg: string; img: string }>({
    status: false,
    msg: "",
    img: "/",
  });

  const [selectedItem, setSelectedItem] = useState<any>(null);

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

  const [win, setWin] = useState<string | null>(null);
  useEffect(() => {
    if (win) SaveLogData(win);
  }, [win]);

  const selectItem = () => {
    if (selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * items.length);
      console.log(items[selectedItem].text);
      soundWheel.play();
      setTimeout(() => {
        const g = items[selectedItem];
        setWin(g.text);
        setModalGift({ status: true, msg: `Selamat Anda mendapatkan ${g.text}`, img: g.img });
        soundWheel.stop();
        soundGift.play();
      }, 4100);

      setSelectedItem(selectedItem);
    } else {
      setSelectedItem(null);
    }
  };

  const SaveLogData = (p: string) => {
    fetch(`https://games.virtualevent.id/api/create-gift?data=${p}`, {
      method: "GET",
    })
      .then((r) => {})
      .catch((err) => {
        toast.error("failed save gift");
      });
  };

  return (
    <div
      className="noselect h-screen w-screen flex flex-col overflow-y-hidden items-center xl:justify-start justify-center bg-spin-mobile md:bg-spin-desktop bg-cover"
      style={{ backgroundSize: "100% 100%" }}
    >
      <Modal status={modalGift.status}>
        <div className="h-[10rem] w-[10rem] mb-2 relative">
          <Image src={`${modalGift.img}`} width="100%" height={"100%"} layout="fill" objectFit="contain" />
        </div>
        <p className="my-4 font-bold text-center">{modalGift.msg}</p>
        <button
          className={`bg-[#8E3DF4] text-white rounded p-2 mb-5`}
          onClick={() => setModalGift({ ...modalGift, status: false })}
        >
          {loading ? <AiOutlineLoading3Quarters className="animate-spin mx-4" /> : "Claim"}
          {/* Claim */}
        </button>
      </Modal>

      <div className="md:mt-[4%] scale-[.65] sm:scale-[.70] md:scale-100">
        <WheelComponent items={items} selectItem={selectItem} selectedItem={selectedItem} />
      </div>
    </div>
  );
};

export default Spin;
