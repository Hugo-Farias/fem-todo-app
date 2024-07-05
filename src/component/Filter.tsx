import { filterT } from "../App.tsx";

type propT = {
  filter: (t: filterT) => void;
  active: filterT;
};

const Filter = function ({ filter, active }: propT) {
  const handleClick = function (id: filterT) {
    filter(id);
  };

  return (
    <div className="flex h-full items-center justify-center gap-5 text-sm font-bold text-content/40 md:text-lg">
      <button
        className={`${active === "all" && "text-hover"} hover:text-hover`}
        onClick={() => handleClick("all")}
      >
        All
      </button>
      <button
        className={`${active === "active" && "text-hover"} hover:text-hover`}
        onClick={() => handleClick("active")}
      >
        Active
      </button>
      <button
        className={`${active === "completed" && "text-hover"} hover:text-hover`}
        onClick={() => handleClick("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default Filter;
