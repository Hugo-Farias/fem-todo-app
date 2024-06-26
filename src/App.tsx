import logo from "./assets/logo.svg";
import sun from "./assets/light.svg";
import moon from "./assets/dark.svg";
import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage, storageDark } from "./helper.ts";

function App() {
  const [darkmode, setDarkmode] = useState<boolean>(
    getLocalStorage(storageDark),
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkmode ? "dark" : "light",
    );
    setLocalStorage(storageDark, darkmode);
  }, [darkmode]);

  return (
    <header className="mx-7 my-12 flex h-5 items-center justify-between overflow-hidden">
      <img className="" src={logo} alt="Todo App Logo" />
      <button className="" onClick={() => setDarkmode((prev) => !prev)}>
        <img src={darkmode ? sun : moon} alt="Toggle theme mode" />
      </button>
    </header>
  );
}

export default App;
