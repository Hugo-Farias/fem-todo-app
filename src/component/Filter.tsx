const Filter = function () {
  return (
    <div className="flex h-full items-center justify-center gap-5 text-sm font-bold text-content/20">
      <button className="hover:text-hover">All</button>
      <button className="hover:text-hover">Active</button>
      <button className="hover:text-hover">Completed</button>
    </div>
  );
};

export default Filter;
