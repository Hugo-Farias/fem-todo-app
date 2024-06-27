import cross from "../assets/icon-cross.svg";
import checkbox from "../assets/icon-checkbox.svg";
import checkmarked from "../assets/icon-checkmarked.svg";
import { dataType } from "../App.tsx";
import { AnimatePresence, motion } from "framer-motion";

type propT = {
  data: dataType;
  remove: (_: number) => void;
};

function List({ data, remove }: propT) {
  const handleClick = function (id: number) {
    remove(id);
  };

  return (
    <motion.ul className="w-full overflow-hidden rounded-xl text-content drop-shadow-xl">
      <AnimatePresence>
        {data.map((v) => (
          <motion.li
            layout
            transition={{ duration: 0.2 }}
            exit={{ x: "100%", opacity: 0 }}
            key={v.id}
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
            <button className="px-3 py-2" onClick={() => handleClick(v.id)}>
              <img className="size-3" src={cross} alt="Remove from list" />
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default List;
