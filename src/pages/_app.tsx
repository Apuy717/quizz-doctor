import "react-toastify/dist/ReactToastify.css";
import "../../styles/globals.css";
import "../../styles/SpinWheel.css";
import "../../styles/transition.css";

import type { AppProps } from "next/app";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import PageTransition from "../components/PageTransition";
import { iAnsCtx } from "../contexts/answer.interface";
import { AnswerContext } from "../contexts/answerContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [email, setEmail] = useState<string>("");
  const [answer, setAnswer] = useState<iAnsCtx[]>([]);
  const [gift, setGift] = useState<string>("");

  return (
    <>
      <AnswerContext.Provider value={{ email, setEmail, answer, setAnswer, gift, setGift }}>
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </AnswerContext.Provider>
    </>
  );
}

export default MyApp;
