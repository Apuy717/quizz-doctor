import React, { createContext, FC, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { iLayoutContext, iLayoutProvider } from "./layout.interface";

export const layoutContext = createContext({} as iLayoutContext);

export const LayoutProvider: FC<iLayoutProvider> = ({ children }) => {
  const [isMenu, setIsMenu] = useState<boolean>(true);
  return (
    <React.Fragment>
      <layoutContext.Provider value={{ isMenu, setIsMenu }}>
        <Sidebar />
        <section className={`p-5 transition-all duration-500 ${isMenu ? `md:ml-80` : ``}`}>{children}</section>
      </layoutContext.Provider>
    </React.Fragment>
  );
};
