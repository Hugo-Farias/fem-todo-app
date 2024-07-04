const Filter = function () {
  return (
    <div className="flex h-full items-center justify-center gap-5 text-sm font-bold text-content/20">
      <button className="hover:text-accent-1">All</button>
      <button className="hover:text-accent-1">Active</button>
      <button className="hover:text-accent-1">Comleted</button>
    </div>
  );
};

export default Filter;
