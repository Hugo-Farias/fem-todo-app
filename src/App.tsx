import logo from "./assets/logo.svg";
import sun from "./assets/icon-sun.svg";
import moon from "./assets/icon-moon.svg";
import { useEffect, useState } from "react";
import {
  getLocalStorage,
  setLocalStorage,
  storageThemeKey,
  deleteFromList,
  toggleFromList,
} from "./helper.ts";
import List from "./component/List.tsx";

const dummy = [
  { id: 1, name: "Complete online JavaScript course", marked: true },
  { id: 2, name: "Jog around the park 3x", marked: false },
  { id: 3, name: "10 minutes meditaion", marked: false },
  { id: 4, name: "Read for 1 hour", marked: false },
  { id: 5, name: "Pick up groceries", marked: false },
  { id: 6, name: "Complete Todo App on Frontend Mentor", marked: false },
];

export type dataType = typeof dummy;

function App() {
  const [data, setData] = useState<dataType>(dummy);
  const [darkmode, setDarkmode] = useState<boolean>(
    getLocalStorage(
      storageThemeKey,
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    ),
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkmode ? "dark" : "light",
    );
    setLocalStorage(storageThemeKey, darkmode);
  }, [darkmode]);

  const handleRemove = function (id: number | null) {
    if (!id) return;
    setData((prev) => deleteFromList(prev, id));
  };

  const handleMark = function (id: number | null) {
    if (!id) return;
    setData((prev) => toggleFromList(prev, id));
  };

  return (
    <div className="px-6 font-josefin text-xsm">
      <header className="my-12 flex h-5 flex-wrap justify-between">
        <img src={logo} alt="Todo App Logo" />
        <button onClick={() => setDarkmode((prev) => !prev)}>
          <img src={darkmode ? sun : moon} alt="Toggle theme mode" />
        </button>
      </header>
      <main>
        <input
          type="text"
          className="mb-4 h-12 w-full rounded-xl border-transparent bg-bkg px-13 text-xsm text-content shadow-xl transition-colors duration-200"
          placeholder="Create a new todo..."
        />
        <List data={data} remove={handleRemove} mark={handleMark} />
      </main>
    </div>
  );
}

export default App;
