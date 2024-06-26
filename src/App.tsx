import logo from "./assets/logo.svg";
import sun from "./assets/light.svg";
import moon from "./assets/dark.svg";
import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage, storageDark } from "./helper.ts";

const dummy = [
  "Complete online JavaScript course",
  "Jog around the park 3x",
  "10 minutes meditaion",
  "Read for 1 hour",
  "Pick up groceries",
  "Complete Todo App on Frontend Mentor",
];

function App() {
  const [darkmode, setDarkmode] = useState<boolean>(
    getLocalStorage(
      storageDark,
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    ),
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkmode ? "dark" : "light",
    );
    setLocalStorage(storageDark, darkmode);
  }, [darkmode]);

  return (
    <div className="text-xsm px-8 font-josefin">
      <header className="my-12 flex h-5 flex-wrap items-center justify-between">
        <img src={logo} alt="Todo App Logo" />
        <button onClick={() => setDarkmode((prev) => !prev)}>
          <img src={darkmode ? sun : moon} alt="Toggle theme mode" />
        </button>
      </header>
      <main>
        <input
          type="text"
          className="px-13 mb-4 min-h-12 w-full rounded-md bg-bkg text-content shadow-xl"
          placeholder="Create a new todo..."
        />
        <ul className="w-full rounded-md bg-bkg text-content drop-shadow-xl">
          {dummy.map((v, i) => (
            <li key={i} className="flex h-12 items-center gap-3 px-5">
              <input
                type="checkbox"
                id={`check${i}`}
                name="checkbox"
                value="1"
                className="rounded-[50%] hover:cursor-pointer"
              />
              <label
                htmlFor={`check${i}`}
                className="flex-grow py-2 hover:cursor-pointer"
              >
                {v}
              </label>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
