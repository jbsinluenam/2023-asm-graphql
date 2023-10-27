const MainButton = ({ title, onClick }) => {
  return (
    <button
      className="bg-slate-400 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
      onClick={onClick}
    >
      {title ?? "Button"}
    </button>
  );
};

export default MainButton;
