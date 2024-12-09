import React from "react";
import { useContext } from "react";
import FlashCardContext from "../context/FormContext";

const MyFlashCard = () => {
  const { flashCardData } = useContext(FlashCardContext);

  if (flashCardData.length === 0) {
    return <p>No FlashCards Found!</p>;
  }

  return (
    <>
      {flashCardData.map((heading) => {
        return (
          <div key={heading.id}>
            <h1>Flash Card Details</h1>
            <h2>Flash Card Group : {heading.group}</h2>
            <h2>Flash Card Description : {heading.description}</h2>
            <h2>
              Flash Card Image : <img src={heading.image} alt="" />
            </h2>
            {heading.subforms.map((card) => {
              return (
                <div key={card.id}>
                  <h3>Card Term : {card.term}</h3>
                  <h3>Card Definition : {card.definition}</h3>
                  <h3>
                    Card Image : <img src={card.image} alt="" />
                  </h3>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* {flashCardData.subforms.map((card) => {
        return (
          <div>
            <h3>Card Term : {card.term}</h3>
            <h3>Card Definition : {card.definition}</h3>
          </div>
        );
      })} */}
    </>
  );
};

export default MyFlashCard;
