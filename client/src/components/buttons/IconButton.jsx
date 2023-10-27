const IconButton = ({ onClick, children, className }) => {
  return (
    <button
      className={`py-2 px-2 text-slate-400 text-base rounded ${className}`}
      onClick={onClick}
    >
      {children ?? "Button"}
    </button>
  );
};

export default IconButton;
