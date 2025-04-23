export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  // Dispatch storage event to update other components
  window.dispatchEvent(new Event("storage"));
};

export const getData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};