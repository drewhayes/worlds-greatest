import {useRouter} from "next/router";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFingerprint} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    const router = useRouter();
    const [code, setCode] = useState();

    function goToCharacter(e) {
        e.preventDefault();
        router.push(code);
    }

    function getCode(e) {
        setCode(e.target.value);
    }

    return (
      <div className="flex flex-col h-screen justify-center items-center bg-gray-200 space-y-5 p-2">
          <FontAwesomeIcon icon={faFingerprint} className="aspect-square text-5xl text-white border-white shadow-xl bg-teal border-4 border-white p-4 -mb-14 z-10 rounded-full" />
          <div className="container max-w-2xl mx-auto gradient-detective border-4 border-white shadow-2xl p-12 pt-16 rounded-2xl text-center space-y-4">
              <h1 className="text-white">Enter Your Player Code</h1>
              <form className="flex space-x-4 justify-between">
                  <input type="text" onInput={ getCode } className="outline outline-2 outline-blue-200 focus:outline-4 px-2 py-1 md:text-2xl grow rounded-lg transition-all bg-white/90 focus:bg-white" />
                  <button type="submit" onClick={goToCharacter} title="Go" className="bg-indigo-100 text-2xl px-2 py-1 rounded-lg outline outline-2 hover:outline-4 focus:outline-4 outline-blue-200 border-none transition-all">Go</button>
              </form>
          </div>
      </div>
    )
}
