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
    <ul className="w-full overflow-hidden rounded-md pb-10 text-content drop-shadow-xl">
      <AnimatePresence>
        {data.map((v) => (
          <motion.li
            layout
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            key={v.id}
            className="flex h-12 items-center gap-3 border-b-[1px] border-content/40 bg-bkg px-5"
          >
            <input
              type="checkbox"
              id={`check${v.id}`}
              name="checkbox"
              value="1"
              className="h-5 w-5 rounded-[50%] border-content/40 bg-transparent outline-transparent hover:cursor-pointer"
            />
            <label
              htmlFor={`check${v.id}`}
              className="flex-grow py-2 hover:cursor-pointer"
            >
              {v.name}
            </label>
            <button onClick={() => handleClick(v.id)}>
              <img src={cross} alt="Remove from list" />
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default List;
