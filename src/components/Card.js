import React from "react";
import "../styles/Card.css";
import ColumnHeaderIcon from "./ColumnHeaderIcon";

const createTitleBadge = (title) => {
  if (!title || typeof title !== "string") return ""; // Handle edge cases and ensure input is a string

  // Split the title into words, map each word to its uppercase first character, and join them
  const badge = title
    .split(" ") // Split the string by spaces to get an array of words
    .map((word) => word.charAt(0).toUpperCase()) // Map each word to its uppercase first character
    .join(""); // Join all the characters together

  return badge;
};

function Card({
  id,
  title,
  tag,
  groupingOption,
  priority,
  userId,
  userName,
  status,
}) {
  return (
    <div className="ticket-card">
      <div className="cardHeader">
        <div className="ticket-id"> {id}</div>
        {groupingOption !== "user" && (
          <p className="ticket-user-id">{createTitleBadge(userName)}</p>
        )}
      </div>
      <span className="ticket-title-tile">
        {groupingOption !== "status" && (
          <ColumnHeaderIcon title={status}></ColumnHeaderIcon>
        )}
        <h3 className="ticket-title">{title}</h3>
      </span>

      <span className="cardFooter">
        {groupingOption !== "priority" && (
          <ColumnHeaderIcon title={priority}></ColumnHeaderIcon>
        )}
        <div className="ticket-tag">{tag}</div>
      </span>
    </div>
  );
}

export default Card;
