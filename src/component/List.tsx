import cross from "../assets/icon-cross.svg";
import checkbox from "../assets/icon-checkbox.svg";
import checkmarked from "../assets/icon-checkmarked.svg";
import { dataType } from "../App.tsx";
import { AnimatePresence, motion } from "framer-motion";

type propT = {
  data: dataType;
  remove: (_: number) => void;
  mark: (_: number) => void;
};

function List({ data, remove, mark }: propT) {
  return (
    <ul className="w-full divide-y divide-content/20 overflow-hidden rounded-xl text-content drop-shadow-xl">
      <AnimatePresence>
        {data.map((v) => (
          <motion.li
            layout
            transition={{ duration: 0.2 }}
            exit={{ scale: 0.9, x: "30%", opacity: 0 }}
            key={v.id}
            data-id={v.id}
            onClick={() => mark(v.id)}
            className="group flex h-12 items-center gap-3 bg-bkg transition-colors duration-200 hover:cursor-pointer"
          >
            <img
              className={`${v.marked || "opacity-50 grayscale"} pl-5 transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0`}
              src={v.marked ? checkmarked : checkbox}
              alt="check todo item"
            ></img>
            <div
              className={`${v.marked && "line-through opacity-50"} flex h-full flex-grow items-center`}
            >
              {v.name}
            </div>
            <button
              className="h-full w-12 transition-colors hover:bg-content/5"
              onClick={(e) => {
                e.stopPropagation();
                remove(v.id);
              }}
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
    </ul>
  );
}

export default List;
