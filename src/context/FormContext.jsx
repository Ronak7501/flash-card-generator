import React from "react";
import { useState } from "react";

const FlashCardContext = React.createContext();

export const FlashcardProvider = ({ children }) => {
  const [flashCardData, setFlashCardData] = useState([]);

  const addFlashCardData = (flashCardForm, addSubform) => {
    const newFlashCard = [
      ...flashCardData,
      { ...flashCardForm, subforms: addSubform },
    ];

    setFlashCardData(newFlashCard);

    console.log(flashCardData);
    console.log(newFlashCard);
  };

  return (
    <FlashCardContext.Provider value={{ addFlashCardData, flashCardData }}>
      {children}
    </FlashCardContext.Provider>
  );
};

export default FlashCardContext;
