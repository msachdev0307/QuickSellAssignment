import React from "react";
import Card from "./Card";
import "../styles/CardContainer.css";
import ColumnHeaderIcon from "./ColumnHeaderIcon";
import { ReactComponent as AddIcon } from "../assets/add.svg";
import { ReactComponent as OptionsIcon } from "../assets/3 dot menu.svg";
function CardContainer({ title, groupingOption, cards }) {
  return (
    <div className="card-column">
      <div className="statusHeader">
        <span className="columnTitle">
          <ColumnHeaderIcon title={title} />
          <span className="columnName">{title}</span>
          <span className="columnCount">{cards.length}</span>
        </span>
        <span className="columnIcons">
          <AddIcon></AddIcon>
          <OptionsIcon></OptionsIcon>
        </span>
      </div>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          groupingOption={groupingOption}
          tag={card.tag}
          priority={card.priority}
          userId={card.userId}
          userName={card.userName}
          status={card.status}
        />
      ))}
    </div>
  );
}

export default CardContainer;
