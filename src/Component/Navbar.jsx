import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto text-center">
        <Link to="/" className="text-xl font-semibold">
          📝 To-Do List
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
