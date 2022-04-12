import {ClipboardCheckIcon} from "@heroicons/react/solid";

export default function Home() {
  return (
      <div className="flex flex-col h-screen justify-center items-center bg-gray-200 space-y-5">
          <ClipboardCheckIcon className="w-20 h-20 text-white border-white shadow-xl bg-gradient-to-tr from-blue-600 to-purple-800 border-4 border-blue-600 p-2 -mb-14 z-10 rounded-full" />
          <div className="container max-w-2xl mx-auto bg-gradient-to-tr from-blue-600 to-purple-800 border-4 border-white shadow-2xl p-12 pt-16 rounded-2xl text-center space-y-4">
              <h1 className="text-white">Enter Your Player Code</h1>
              <div className="flex space-x-4 justify-between">
                  <input type="text" className="outline outline-2 outline-blue-200 focus:outline-4 px-2 py-1 text-2xl grow rounded-lg transition-all bg-white/90 focus:bg-white" />
                  <button type="submit" title="Go" className="bg-indigo-100 text-2xl px-2 py-1 rounded-lg outline outline-2 hover:outline-4 focus:outline-4 outline-blue-200 border-none transition-all">Go</button>
              </div>
          </div>
      </div>
  )
}
