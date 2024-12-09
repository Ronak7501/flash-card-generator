import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FlashcardProvider } from "./context/FormContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FlashcardProvider>
      <App />
    </FlashcardProvider>
  </BrowserRouter>
);
