import cross from "../assets/icon-cross.svg";
import checkbox from "../assets/icon-checkbox.svg";
import checkmarked from "../assets/icon-checkmarked.svg";
import { dataType } from "../App.tsx";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type propT = {
  data: dataType;
  remove: (_: number) => void;
  mark: (_: number) => void;
};

function List({ data, remove, mark }: propT) {
  const handleCheck = function (e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLDivElement;
    const id = target.closest("li")!.getAttribute("data-id");

    if (!id) return;

    mark(+id);
  };

  const handleRemove = function (id: number) {
    remove(id);
  };

  return (
    <motion.ul className="w-full overflow-hidden rounded-xl text-content drop-shadow-xl">
      <AnimatePresence>
        {data.map((v) => (
          <motion.li
            layout
            transition={{ duration: 0.2 }}
            exit={{ scale: 0.9, x: "10%", opacity: 0 }}
            key={v.id}
            data-id={v.id}
            onClick={handleCheck}
            className="group flex h-12 items-center gap-3 border-b-[1px] border-content/20 bg-bkg transition-colors duration-200 hover:cursor-pointer"
          >
            <img
              className={`${v.marked || "opacity-50 grayscale"} pl-5 transition-opacity duration-300 group-hover:opacity-100 group-hover:grayscale-0`}
              src={v.marked ? checkmarked : checkbox}
              alt="check todo item"
            ></img>
            <div
              className={`${v.marked && "line-through opacity-50"} flex h-full flex-grow items-center`}
            >
              {v.name}
            </div>
            <button
              className="h-full w-12 hover:bg-black/10"
              onClick={() => handleRemove(v.id)}
            >
              <img
                className="mx-auto size-3"
                src={cross}
                alt="Remove from list"
              />
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default List;
