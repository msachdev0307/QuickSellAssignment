import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import HeaderNavbar from "./components/HeaderNavBar";
import { fetchData, saveViewState, loadViewState } from "./utils/api";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState("status");
  const [sortOption, setSortOption] = useState("priority");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const savedViewState = loadViewState();
    if (savedViewState) {
      setGroupingOption(savedViewState.groupingOption);
      setSortOption(savedViewState.sortOption);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveViewState({
        groupingOption,
        sortOption,
      });
    }
  }, [groupingOption, sortOption, isLoaded]);

  const handleGroupingOptionChange = (option) => {
    setGroupingOption(option);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="app">
      <HeaderNavbar
        onGroupingOptionChange={handleGroupingOptionChange}
        onSortOptionChange={handleSortOptionChange}
        groupingOption={groupingOption}
        sortOption={sortOption}
      />
      {isLoaded && (
        <KanbanBoard
          tickets={tickets}
          users={users}
          groupingOption={groupingOption}
          sortOption={sortOption}
        />
      )}
    </div>
  );
}

export default App;
