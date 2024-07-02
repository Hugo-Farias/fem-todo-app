import { dataType } from "../App.tsx";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import React from "react";
import ListItem from "./ListItem.tsx";

export type baseItemProp = {
  remove: (id: number) => void;
  mark: (id: number) => void;
};

type propT = baseItemProp & {
  data: dataType;
  reorder: React.Dispatch<dataType>;
};

function List({ data, remove, mark, reorder }: propT) {
  return (
    <Reorder.Group
      axis="y"
      values={data}
      onReorder={reorder}
      className="w-full divide-y divide-content/20 text-content drop-shadow-xl"
    >
      <AnimatePresence>
        {data.map((v) => (
          <ListItem key={v.id} data={v} remove={remove} mark={mark} />
        ))}
        <motion.div
          layout
          transition={{ duration: 0.1 }}
          className="-z-10 flex h-12 items-center rounded-b-md bg-bkg px-6 transition-colors first:rounded-t-md"
        >
          <div className="opacity-50">
            {data.filter((v) => !v.marked).length} items left
          </div>
        </motion.div>
      </AnimatePresence>
    </Reorder.Group>
  );
}

export default List;
