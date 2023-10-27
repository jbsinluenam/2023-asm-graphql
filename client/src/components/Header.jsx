import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/">
      <h1 className="text-center text-2xl font-semibold py-4 border-b border-gray-200">
        PEOPLE AND THEIR CARS
      </h1>
    </Link>
  );
};

export default Header;
