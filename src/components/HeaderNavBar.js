import React from "react";
import "../styles/HeaderNavBar.css"; // Ensure you have CSS file for styling

function HeaderNavBar({
  onGroupingOptionChange,
  onSortOptionChange,
  groupingOption,
  sortOption,
}) {
  return (
    <div className="navbar">
      <div className="dropdown">
        <label htmlFor="grouping">Group By:</label>
        <select
          id="grouping"
          value={groupingOption || ""}
          onChange={(e) => onGroupingOptionChange(e.target.value)}
        >
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="sorting">Sort By:</label>
        <select
          id="sorting"
          value={sortOption || ""}
          onChange={(e) => onSortOptionChange(e.target.value)}
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default HeaderNavBar;
