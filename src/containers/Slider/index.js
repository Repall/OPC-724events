import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) => (new Date(evtA.date) > new Date(evtB.date) ? -1 : 1)) || []; // [] ET >
  // console.log(byDateDesc)
  // console.log(index);
  
  const nextCard = () => {
    setTimeout(() => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 5000); // -1
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc.length > 0 && byDateDesc.map((event, idx) => (
        <React.Fragment key={event.title}>
          <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((card, radioIdx) => (
                <input key={card.title} type="radio" name="radio-button" checked={index === radioIdx} readOnly /> // radio par radioIdx ET event.id
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
