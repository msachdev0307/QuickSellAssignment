import React from "react";
import CardContainer from "./CardContainer";
import "../styles/KanbanBoard.css";

// KanbanBoard component for displaying tickets in columns based on grouping and sorting options
function KanbanBoard({ tickets, users, groupingOption, sortOption }) {
  // Process tickets: group and then sort based on provided options
  const groupedAndSortedTickets = processTickets(
    tickets,
    groupingOption,
    sortOption
  );
  const userMap = new Map(users.map((user) => [user.id, user.name]));
  // Determine unique values for the grouping option to create columns
  const uniqueGroupValues = getUniqueGroupValues(
    groupedAndSortedTickets,
    groupingOption
  );
  const getGroupTitle = (groupValue, groupingOption) => {
    if (groupingOption === "user") {
      return users.filter((x) => x.id === groupValue)[0].name;
    } else if (groupingOption === "priority") {
      let priorityTitle = "";
      switch (groupValue) {
        case 0:
          priorityTitle = "No priority";
          break;
        case 1:
          priorityTitle = "Low";
          break;
        case 2:
          priorityTitle = "Medium";
          break;
        case 3:
          priorityTitle = "High";
          break;
        case 4:
          priorityTitle = "Urgent";
          break;
        default:
          // Handle any unexpected values
          priorityTitle = "";
          // Your code for unknown grouping option
          break;
      }
      return priorityTitle;
    } else return groupValue;
  };
  // Render the columns for the Kanban board
  const renderColumns = () => {
    return uniqueGroupValues.map((groupValue) => {
      // Filter tickets for the current group value
      const filteredTickets = groupedAndSortedTickets.filter(
        (ticket) => getGroupValue(ticket, groupingOption) === groupValue
      );

      // Prepare column data for TicketColumn component
      const columnData = {
        title: getGroupTitle(groupValue, groupingOption),
        groupingOption: groupingOption,
        cards: filteredTickets.map((ticket) => ({
          id: ticket.id,
          title: ticket.title,
          tag: ticket.tag,
          priority: ticket.priority,
          userId: ticket.userId,
          userName: userMap.get(ticket.userId),
          status: ticket.status,
        })),
      };

      // Return a TicketColumn component for each group
      return <CardContainer key={groupValue} {...columnData} />;
    });
  };

  return <div className="kanban-board">{renderColumns()}</div>;
}

// Function to process tickets by grouping and sorting
const processTickets = (tickets, groupingOption, sortOption) => {
  let groupedTickets = groupTickets(tickets, groupingOption);

  // Sort tickets based on the selected sort option
  if (sortOption === "priority") {
    groupedTickets = sortByPriority(groupedTickets);
  } else if (sortOption === "title") {
    groupedTickets = sortByTitle(groupedTickets);
  }

  return groupedTickets.flat();
};

// Function to group tickets based on the grouping option
const groupTickets = (tickets, groupingOption) => {
  return tickets.reduce((grouped, ticket) => {
    const key = getGroupValue(ticket, groupingOption);
    (grouped[key] = grouped[key] || []).push(ticket);
    return grouped;
  }, {});
};

// Function to sort tickets within each group by priority
const sortByPriority = (groupedTickets) => {
  return Object.values(groupedTickets).map((group) =>
    group.sort((a, b) => b.priority - a.priority)
  );
};

// Function to sort tickets within each group by title
const sortByTitle = (groupedTickets) => {
  return Object.values(groupedTickets).map((group) =>
    group.sort((a, b) => a.title.localeCompare(b.title))
  );
};

// Function to get unique values for the grouping option
const getUniqueGroupValues = (tickets, groupingOption) => {
  if (groupingOption === "status") {
    const statuses = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];
    return statuses;
  } else
    return [
      ...new Set(
        tickets.map((ticket) => getGroupValue(ticket, groupingOption))
      ),
    ];
};

// Function to get the value for grouping based on the option
const getGroupValue = (ticket, groupingOption) => {
  switch (groupingOption) {
    case "status":
      return ticket.status;
    case "user":
      return ticket.userId;
    case "priority":
      return ticket.priority;
    default:
      return "";
  }
};

export default KanbanBoard;
