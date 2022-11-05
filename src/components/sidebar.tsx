import { FC, useContext, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FaChevronDown, FaHome, FaUsers } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { MdOutlineNotificationsActive, MdOutlineHistoryEdu } from "react-icons/md";
import { layoutContext } from "../contexts/layoutContext";
import { iSubMenu, iSubMenus } from "./sidebar.interface";
import { BsCardText } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { TfiGallery, TfiUser } from "react-icons/tfi";
import { GiLovers } from "react-icons/gi";

export const SubMenu: FC<{ data: iSubMenu[] }> = ({ data }) => {
  return (
    <>
      {data.map((itm, idx) => (
        <Link href={itm.href} key={idx}>
          <a
            key={idx}
            className={`flex flex-row items-center text-base mt-2 cursor-pointer ${
              itm.isActive ? `bg-[#7B5DCE]` : ``
            } hover:bg-[#7B5DCE] p-2 rounded-md`}
          >
            <div className="mr-5 text-xl">
              <>{itm.icon}</>
            </div>
            <p>{itm.title}</p>
          </a>
        </Link>
      ))}
    </>
  );
};

export const SubMenus: FC<{ data: iSubMenus[] }> = ({ data }) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  return (
    <>
      {data.map((itm, idx) => (
        <div key={idx}>
          <div
            className="flex flex-row items-center text-base mt-2 cursor-pointer hover:bg-[#7B5DCE] p-2 rounded-md"
            onClick={() => setIsActive(!isActive)}
          >
            <FaChevronDown className={`mr-5 text-xl ${isActive ? `rotate-0` : `-rotate-90`}`} />
            <p>{itm.title}</p>
          </div>
          <div className={`${isActive ? `block` : `hidden`} ml-5 pl-10 border-l`}>
            <ol className="list-disc">
              {itm.subMenu.map((sub, index) => (
                <Link href={sub.href} key={index}>
                  <a>
                    <li className={`cursor-pointer mb-2 ${sub.isActive ? `bg-[#7B5DCE]` : ``} hover:bg-[#7B5DCE] p-2 rounded-md`} key={index}>
                      {sub.title}
                    </li>
                  </a>
                </Link>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </>
  );
};

export const Sidebar: FC = () => {
  const { isMenu, setIsMenu } = useContext(layoutContext);
  const { pathname } = useRouter();

  const listMenu: iSubMenu[] = [
    { title: "Dashboard", icon: <FaHome />, href: "/adp/", isActive: pathname === `/adp` ? true : false },
    { title: "Resepsi", icon: <GiLovers />, href: "/adp/resepsi", isActive: pathname === `/adp/resepsi` ? true : false },
    { title: "Sambutan", icon: <BsCardText />, href: "/adp/sambutan", isActive: pathname === `/adp/sambutan` ? true : false },
    { title: "Tamu Undangan", icon: <FaUsers />, href: "/adp/invited-guest", isActive: pathname === `/adp/invited-guest` ? true : false },
    { title: "Cerita Kita", icon: <MdOutlineHistoryEdu />, href: "/adp/my-story", isActive: pathname === `/adp/my-story` ? true : false },
    { title: "Galeri", icon: <TfiGallery />, href: "/adp/my-gallery", isActive: pathname === `/adp/my-gallery` ? true : false },
    { title: "Setting", icon: <CiSettings />, href: "/adp/setting", isActive: pathname === `/adp/setting` ? true : false },
  ];

  const subMenu: iSubMenu[] = [
    { title: "Banner", icon: <FaHome />, href: "#", isActive: false },
    { title: "Lokasi Pernikahan", icon: <FaHome />, href: "#", isActive: false },
    { title: "Tanggal Resepsi", icon: <BsCardText />, href: "#", isActive: false },
  ];

  const listSubMenus: iSubMenus[] = [{ title: "Config", subMenu: subMenu }];

  return (
    <>
      <header className="h-[4rem] w-full flex flex-row items-center justify-between sticky top-0 z-10 bg-[#EFF2F7]">
        <div className="w-80">
          <FiMenu className="text-2xl ml-5 text-gray-600 cursor-pointer" onClick={() => setIsMenu(!isMenu)} />
        </div>
        <div className="h-full p-3 flex-1 flex items-center">
          <input type="text" placeholder="Search" className="w-[70%] h-full p-2 focus:outline-none border-2 focus:border-[#613ED0] rounded-md" />
        </div>
        <div className="pr-[5rem] flex flex-row">
          <MdOutlineNotificationsActive className="mr-2 ml-2 text-2xl text-gray-600 cursor-pointer" />
          <CiSettings className="mr-2 ml-2 text-2xl text-gray-600 cursor-pointer" />
        </div>
      </header>
      <aside
        className={`z-50 w-80 h-full fixed bg-[#613ED0] rounded-r-[4rem] text-white p-[2rem] transition-all duration-500 ${
          isMenu ? `` : `-translate-x-full`
        }`}
      >
        <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-gray-300 flex items-center justify-center text-[#613ED0] absolute -top-5 left-8 border-2 border-white">
          <p className="font-bold text-3xl">AG</p>
        </div>
        <div className="mt-[2rem] border-b p-[1rem]">
          <p className="text-3xl mb-2 font-bold">Abdul Gopur</p>
          <p>members</p>
        </div>
        <SubMenu data={listMenu} />
        <SubMenus data={listSubMenus} />
      </aside>
    </>
  );
};
