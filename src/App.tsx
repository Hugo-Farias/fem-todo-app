import logo from "./assets/logo.svg";
import sun from "./assets/light.svg";
import moon from "./assets/dark.svg";
import { useEffect, useState } from "react";
import {
  getLocalStorage,
  setLocalStorage,
  storageThemeKey,
  deleteFromList,
} from "./helper.ts";
import List from "./component/List.tsx";

const dummy = [
  { id: 1, name: "Complete online JavaScript course" },
  { id: 2, name: "Jog around the park 3x" },
  { id: 3, name: "10 minutes meditaion" },
  { id: 4, name: "Read for 1 hour" },
  { id: 5, name: "Pick up groceries" },
  { id: 6, name: "Complete Todo App on Frontend Mentor" },
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

  const handleRemove = function (id: number) {
    setData((prev) => deleteFromList(prev, id));
  };

  return (
    <div className="px-8 font-josefin text-xsm">
      <header className="my-12 flex h-5 flex-wrap items-center justify-between">
        <img src={logo} alt="Todo App Logo" />
        <button onClick={() => setDarkmode((prev) => !prev)}>
          <img src={darkmode ? sun : moon} alt="Toggle theme mode" />
        </button>
      </header>
      <main>
        <input
          type="text"
          className="mb-4 min-h-12 w-full rounded-xl bg-bkg px-13 text-content shadow-xl"
          placeholder="Create a new todo..."
        />
        <List data={data} remove={handleRemove} />
      </main>
    </div>
  );
}

export default App;
