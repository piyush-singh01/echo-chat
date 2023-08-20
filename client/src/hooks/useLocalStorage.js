const useLocalStorage = () => {
  const getUserID = () => {
    return window.localStorage.getItem("user_id");
  };

  const setUserID = (data) => {
    window.localStorage.setItem("user_id", data);
  };

  const removeUserID = () => {
    window.localStorage.removeItem("user_id");
  };

  return { getUserID, setUserID, removeUserID };
};

export default useLocalStorage;