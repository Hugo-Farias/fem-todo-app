import cross from "../assets/icon-cross.svg";
import checkbox from "../assets/icon-checkbox.svg";
import checkmarked from "../assets/icon-checkmarked.svg";
import { dataType } from "../App.tsx";
import { AnimatePresence, Reorder } from "framer-motion";
import React, { useState } from "react";

type propT = {
  data: dataType;
  remove: (_: number) => void;
  mark: (_: number) => void;
  reorder: React.Dispatch<dataType>;
};

function List({ data, remove, mark, reorder }: propT) {
  const [isDragState, setIsDragState] = useState<boolean>(false);

  return (
    <Reorder.Group
      axis="y"
      values={data}
      onReorder={reorder}
      className="w-full divide-y divide-content/20 text-content drop-shadow-xl"
    >
      <AnimatePresence>
        {data.map((v) => (
          <Reorder.Item
            onDragStart={() => setIsDragState(true)}
            onDragEnd={() => setIsDragState(false)}
            value={v}
            key={v.id}
            transition={{ duration: 0.1 }}
            exit={{ scale: 0.9, x: "30%", opacity: 0 }}
            onClick={() => {
              if (isDragState) return;
              mark(v.id);
            }}
            className="group flex h-12 items-center gap-3 bg-bkg transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl hover:cursor-pointer"
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
              className="group h-full w-12 transition-colors hover:bg-content/5 group-first:rounded-tr-xl group-last:rounded-br-xl"
              onClick={(e) => {
                if (isDragState) return;
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
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}

export default List;
