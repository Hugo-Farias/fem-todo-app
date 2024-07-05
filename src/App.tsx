import logo from "./assets/logo.svg";
import sun from "./assets/icon-sun.svg";
import moon from "./assets/icon-moon.svg";
import checkbox from "./assets/icon-checkbox.svg";
import { ElementRef, useEffect, useRef, useState } from "react";
import {
  getLocalStorage,
  setLocalStorage,
  storageThemeKey,
  deleteFromList,
  toggleFromList,
  addToList,
  clearList,
} from "./helper.ts";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import ListItem from "./component/ListItem.tsx";
import Filter from "./component/Filter.tsx";

const dummy = [
  { id: 1, name: "Complete online JavaScript course", marked: true },
  { id: 2, name: "Jog around the park 3x", marked: false },
  { id: 3, name: "10 minutes meditation", marked: false },
  { id: 4, name: "Read for 1 hour", marked: false },
  { id: 5, name: "Pick up groceries", marked: false },
];

export type dataType = typeof dummy;

export type filterT = "all" | "active" | "completed";

function App() {
  const inputRef = useRef<ElementRef<"input">>(null);
  const [filter, setFilter] = useState<filterT>("all");
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

  const handleAdd = function () {
    if (!inputRef.current) return;
    const value = inputRef.current.value;
    if (!value) return;
    inputRef.current.value = "";
    setData((prev) => addToList(prev, value));
  };

  return (
    <div className="px-6 font-josefin text-xsm font-normal">
      <header className="my-12 flex h-5 flex-wrap justify-between">
        <img src={logo} alt="Todo App Logo" />
        <button onClick={() => setDarkmode((prev) => !prev)}>
          <img src={darkmode ? sun : moon} alt="Toggle theme mode" />
        </button>
      </header>
      <main className="mb-10">
        <div className="relative mb-4 h-12 w-full rounded-md bg-bkg text-xsm text-content shadow-xl transition-colors duration-200">
          <img
            className="absolute left-5 top-1/2 -translate-y-1/2 opacity-50 grayscale"
            src={checkbox}
            alt=""
            onClick={handleAdd}
          />
          <input
            className="h-full w-full rounded-md border-transparent bg-transparent px-13 text-xsm"
            type="text"
            placeholder="Create a new todo..."
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              return handleAdd();
            }}
          />
        </div>
        <Reorder.Group
          axis="y"
          values={data}
          onReorder={setData}
          className="w-full divide-y divide-content/20 text-content drop-shadow-xl"
        >
          <AnimatePresence>
            {data.map((v) => {
              if (filter === "active" && v.marked) return;
              if (filter === "completed" && !v.marked) return;

              return (
                <ListItem
                  key={v.id}
                  data={v}
                  remove={(id) => {
                    if (!id) return;
                    setData((prev) => deleteFromList(prev, id));
                  }}
                  mark={(id) => {
                    if (!id) return;
                    setData((prev) => toggleFromList(prev, id));
                  }}
                />
              );
            })}
            <motion.div
              layout
              transition={{ duration: 0.2 }}
              className="mb-4 flex h-12 items-center rounded-b-md bg-bkg px-6 transition-colors first:rounded-t-md"
            >
              <div className="flex w-full justify-between text-content/50">
                <div className="text-inherit">
                  {data.filter((v) => !v.marked).length} items left
                </div>
                <button
                  className="hover:text-content"
                  onClick={() => setData((prev) => clearList(prev))}
                >
                  Clear Completed
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reorder.Group>
      </main>
      <div className="h-12 rounded-md bg-bkg shadow-xl">
        <Filter filter={(t) => setFilter(t)} active={filter} />
      </div>
    </div>
  );
}

export default App;
