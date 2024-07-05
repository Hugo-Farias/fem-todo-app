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
import useInputType from "./hooks/useInputType.ts";

const dummy = [
  { id: 1, name: "Complete online JavaScript course", marked: true },
  { id: 2, name: "Jog around the park 3x", marked: false },
  { id: 3, name: "10 minutes meditation", marked: false },
  { id: 4, name: "Read for 1 hour", marked: false },
  { id: 5, name: "Pick up groceries", marked: false },
  { id: 6, name: "Complete Todo App on Frontend Mentor", marked: false },
  { id: 7, name: "Clean the house", marked: false },
  { id: 8, name: "Finish homework", marked: false },
  { id: 9, name: "Work on side project", marked: false },
  { id: 10, name: "Practice guitar", marked: false },
  { id: 11, name: "Prepare dinner", marked: false },
  { id: 12, name: "Watch a movie", marked: false },
  { id: 13, name: "Call mom", marked: false },
  { id: 14, name: "Plan weekend trip", marked: false },
  { id: 15, name: "Water the plants", marked: false },
  { id: 16, name: "Exercise for 30 minutes", marked: false },
  { id: 17, name: "Write in journal", marked: false },
  { id: 18, name: "Read news articles", marked: false },
  { id: 19, name: "Organize desk", marked: false },
  { id: 20, name: "Update resume", marked: false },
];

export type dataType = typeof dummy;

export type filterT = "all" | "active" | "completed";

function App() {
  const inputType = useInputType();
  const textInputRef = useRef<ElementRef<"input">>(null);
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
    if (!textInputRef.current) return;
    const value = textInputRef.current.value;
    if (!value) return;
    textInputRef.current.value = "";
    setData((prev) => addToList(prev, value));
  };

  return (
    <div className="min-w-[320px] px-6 pb-10 font-josefin text-xs font-normal md:text-base">
      <header className="my-12 flex h-5 flex-wrap justify-between">
        <img src={logo} alt="Todo App Logo" />
        <button onClick={() => setDarkmode((prev) => !prev)}>
          <img src={darkmode ? sun : moon} alt="Toggle theme mode" />
        </button>
      </header>
      <main className="mb-10">
        <div className="relative mb-4 h-12 w-full rounded-md bg-bkg text-content shadow-xl transition-colors duration-200 md:h-16">
          <img
            className="absolute left-5 top-1/2 -translate-y-1/2 opacity-50 grayscale"
            src={checkbox}
            alt=""
            onClick={handleAdd}
          />
          <input
            className="h-full w-full rounded-md border-transparent bg-transparent px-13 text-xs md:text-base"
            type="text"
            placeholder="Create a new todo..."
            ref={textInputRef}
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
              className="flex h-12 items-center rounded-b-md bg-bkg px-6 transition-colors md:h-16"
            >
              <div className="flex w-full items-center justify-between text-content/50">
                <div className="text-inherit">
                  {data.filter((v) => !v.marked).length} items left
                </div>
                <div className="hidden md:block">
                  <Filter filter={(t) => setFilter(t)} active={filter} />
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
      <div className="h-12 rounded-md bg-bkg shadow-xl md:hidden">
        <Filter filter={(t) => setFilter(t)} active={filter} />
      </div>
      <footer className="mt-10 flex select-none justify-center text-sm text-content/40">
        {`Drag and drop ${inputType === "touch" ? "the left side" : ""} to reorder list`}
      </footer>
    </div>
  );
}

export default App;
