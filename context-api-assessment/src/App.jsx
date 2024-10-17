import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./LoginForm";
// import { createContext } from "react";
import React,{ useState } from "react";
export const AppContext = React.createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  return (
    <AppContext.Provider value={{ darkMode, toggleTheme }}>
      <LoginForm />
    </AppContext.Provider>
  );
}

export default App;
