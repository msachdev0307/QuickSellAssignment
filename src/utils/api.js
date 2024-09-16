const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

export const fetchData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const loadViewState = () => {
  const savedViewState = localStorage.getItem("kanban-view-state");
  return savedViewState ? JSON.parse(savedViewState) : null;
};

export const saveViewState = (state) => {
  localStorage.setItem("kanban-view-state", JSON.stringify(state));
};
