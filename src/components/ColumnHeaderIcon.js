// src/components/StatusIcon.js

import React from "react";

import { ReactComponent as ToDoIcon } from "../assets/To-do.svg"; // Import SVG files
import { ReactComponent as InProgressIcon } from "../assets/in-progress.svg";
import { ReactComponent as BacklogIcon } from "../assets/Backlog.svg";
import { ReactComponent as DoneIcon } from "../assets/Done.svg";
import { ReactComponent as CancelledIcon } from "../assets/Cancelled.svg";
import { ReactComponent as UrgentIcon } from "../assets/SVG - Urgent Priority colour.svg"; // Import SVG files
import { ReactComponent as HighPriorityIcon } from "../assets/Img - High Priority.svg";
import { ReactComponent as LowPriorityIcon } from "../assets/Img - Low Priority.svg";
import { ReactComponent as MediumPriorityIcon } from "../assets/Img - Medium Priority.svg";
import { ReactComponent as NoPriorityIcon } from "../assets/No-priority.svg";

// Map statuses to their respective icons
const iconsMap = {
  Todo: <ToDoIcon />,
  "In progress": <InProgressIcon />,
  Done: <DoneIcon />,
  Backlog: <BacklogIcon />,
  Cancelled: <CancelledIcon />,
  Urgent: <UrgentIcon />,
  High: <HighPriorityIcon />,
  Medium: <MediumPriorityIcon />,
  Low: <LowPriorityIcon />,
  "No priority": <NoPriorityIcon />,
  4: <UrgentIcon />,
  3: <HighPriorityIcon />,
  2: <MediumPriorityIcon />,
  1: <LowPriorityIcon />,
  0: <NoPriorityIcon />,
};
const createTitleBadge = (title) => {
  if (!title || typeof title !== "string") return ""; // Handle edge cases and ensure input is a string

  // Split the title into words, map each word to its uppercase first character, and join them
  const badge = title
    .split(" ") // Split the string by spaces to get an array of words
    .map((word) => word.charAt(0).toUpperCase()) // Map each word to its uppercase first character
    .join(""); // Join all the characters together

  return badge;
};

function ColumnHeaderIcon({ title }) {
  return (
    <div className="status-icon">
      {iconsMap[title] || (
        <span className="user-id-icon">{createTitleBadge(title)}</span>
      )}{" "}
      {/* Fallback */}
    </div>
  );
}

export default ColumnHeaderIcon;
