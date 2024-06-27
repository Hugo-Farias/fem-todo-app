import cross from "../assets/icon-cross.svg";
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
            exit={{ x: "50%", opacity: 0 }}
            key={v.id}
            className="flex h-12 items-center gap-3 border-b-[1px] border-content/20 bg-bkg pr-5 transition-colors duration-200"
          >
            <div className="circle-gradient flex h-full flex-grow items-center pl-13 hover:cursor-pointer">
              {v.name}
            </div>
            <button onClick={() => handleClick(v.id)}>
              <img src={cross} alt="Remove from list" />
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default List;
