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
  storageListKey,
} from "./helper.ts";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import ListItem from "./component/ListItem.tsx";
import Filter from "./component/Filter.tsx";
import useInputType from "./hooks/useInputType.ts";

const dummy = [
  { id: 1, name: "Complete online JavaScript course", marked: true },
  { id: 2, name: "Jog around the park 3x", marked: true },
  { id: 3, name: "10 minutes meditation", marked: false },
  { id: 4, name: "Read for 1 hour", marked: false },
  { id: 5, name: "Pick up groceries", marked: false },
  { id: 6, name: "Complete Todo App on Frontend Mentor", marked: false },
];

export type dataType = typeof dummy;

export type filterT = "all" | "active" | "completed";

function App() {
  const inputType = useInputType();
  const textInputRef = useRef<ElementRef<"input">>(null);
  const [filter, setFilter] = useState<filterT>("completed");
  const [data, setData] = useState<dataType>(
    getLocalStorage(storageListKey, dummy),
  );
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
  }, [darkmode]);

  //TODO fix bug deleting completed tasks when reordering while fitered by 'active'
  // useEffect(() => {
  //   data.forEach((v) => console.log(v));
  //   setLocalStorage(storageListKey, data);
  // }, [data]);

  const handleAdd = function () {
    if (!textInputRef.current) return;
    const value = textInputRef.current.value;
    if (!value) return;
    textInputRef.current.value = "";
    setData((prev) => addToList(prev, value));
  };

  return (
    <div className="px-6 pb-10 font-josefin text-xs font-normal md:text-base">
      <div className="mx-auto max-w-[540px]">
        <header className="my-12 flex h-5 flex-wrap justify-between">
          <img src={logo} alt="Todo App Logo" />
          <button
            onClick={() => {
              setDarkmode((prev) => {
                setLocalStorage(storageThemeKey, !darkmode);
                return !prev;
              });
            }}
          >
            <img src={darkmode ? sun : moon} alt="Toggle theme mode" />
          </button>
        </header>
        <main className="mb-10">
          <div className="relative mb-4 h-12 w-full rounded-md bg-bkg text-content shadow-xl transition-colors duration-200 md:h-16">
            <img
              className="absolute left-5 top-1/2 -translate-y-1/2 opacity-50 grayscale hover:cursor-pointer"
              src={checkbox}
              alt=""
              onClick={() => handleAdd()}
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
                const hide =
                  (filter === "active" && v.marked) ||
                  (filter === "completed" && !v.marked);

                return (
                  <ListItem
                    key={v.id}
                    data={v}
                    hidden={hide}
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
                  <div>{data.filter((v) => !v.marked).length} items left</div>
                  <div className="hidden sm:block">
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
        <div className="h-12 rounded-md bg-bkg shadow-xl sm:hidden">
          <Filter filter={(t) => setFilter(t)} active={filter} />
        </div>
        <footer className="mt-10 flex select-none justify-center text-sm text-content/40">
          {`Drag and drop ${inputType === "touch" ? "the left side" : ""} to reorder list`}
        </footer>
      </div>
    </div>
  );
}

export default App;
