import checkmarked from "../assets/icon-checkmarked.svg";
import checkbox from "../assets/icon-checkbox.svg";
import cross from "../assets/icon-cross.svg";
import { Reorder, useDragControls } from "framer-motion";
import { dataType } from "../App.tsx";
import { useState } from "react";
import useInputType from "../hooks/useInputType.ts";

type propT = {
  data: dataType[number];
  remove: (id: number) => void;
  mark: (id: number) => void;
  hidden: boolean;
};

function ListItem({ data, remove, mark, hidden }: propT) {
  const [isDragState, setIsDragState] = useState<boolean>(false);
  const inputType = useInputType();
  const controls = useDragControls();

  return (
    <Reorder.Item
      onDragStart={() => setIsDragState(true)}
      onDragEnd={() => setIsDragState(false)}
      value={data}
      key={data.id}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0, translate: "20%" }}
      dragControls={controls}
      dragListener={inputType === "mouse"}
      onClick={() => {
        if (isDragState) return;
        mark(data.id);
      }}
      className={`${hidden && "hidden"} group relative flex h-12 select-none items-center gap-3 bg-bkg transition-colors first:rounded-t-md last:rounded-b-xl hover:cursor-pointer md:h-16`}
    >
      <img
        className={`${data.marked || "opacity-50 grayscale"} touch-none py-2 pl-5 group-hover:opacity-100 group-hover:grayscale-0`}
        src={data.marked ? checkmarked : checkbox}
        alt="check todo item"
        key={data.id}
        onPointerDown={(e) => controls.start(e)}
        draggable={false}
      ></img>
      <div
        className={`${data.marked && "line-through opacity-50"} flex h-full flex-grow items-center`}
      >
        {data.name}
      </div>
      <button
        className={`${inputType === "mouse" && "invisible group-hover:visible"} "group aspect-square h-full hover:bg-content/5 group-first:rounded-tr-md`}
        onClick={(e) => {
          e.stopPropagation();
          if (isDragState) return;
          remove(data.id);
        }}
      >
        <img className="mx-auto size-3" src={cross} alt="Remove from list" />
      </button>
    </Reorder.Item>
  );
}

export default ListItem;
