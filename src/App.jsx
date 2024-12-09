import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import CreateFlashCard from "./components/CreateFlashCard.jsx";
import { useRef } from "react";
import { useEffect } from "react";
import MyFlashCard from "./components/MyFlashCard.jsx";

function App() {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const createTabRef = useRef(null);
  const myFlashcardTabRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    // Calculate the position and width of the active tab
    const updateUnderline = () => {
      const activeTabRef =
        location.pathname === "/"
          ? createTabRef.current
          : myFlashcardTabRef.current;

      if (activeTabRef) {
        const { offsetLeft, offsetWidth } = activeTabRef;
        setUnderlineStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    };

    updateUnderline();

    // Recalculate on window resize
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [location]);

  return (
    <>
      <div className="w-[90%] sm:w-[70%] m-auto my-12 ">
        <div className=" flex justify-center sm:justify-start heading font-bold my-2 ">
          <h1>Create FlashCard</h1>
        </div>

        <div className="options flex justify-center sm:justify-start text-sm  gap-8 font-semibold relative">
          <Link
            ref={createTabRef}
            to="/"
            className={`create cursor-pointer ${
              location.pathname === "/" ? "text-red-700" : "text-gray-400"
            }`}
            // onClick={() => setActiveTab("create")}
          >
            Create New
          </Link>
          <Link
            ref={myFlashcardTabRef}
            to="/myflashcard"
            className={`myflashcard cursor-pointer ${
              location.pathname === "/myflashcard"
                ? "text-red-700"
                : "text-gray-400"
            }`}
            // onClick={() => setActiveTab("myflashcard")}
          >
            My Flashcard
          </Link>

          <div className="my-3">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black"></div>

            <div
              className="absolute bottom-0 h-[3px] bg-red-700 transition-all duration-200"
              style={underlineStyle}
            ></div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<CreateFlashCard />} />
          <Route path="/myflashcard" element={<MyFlashCard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
