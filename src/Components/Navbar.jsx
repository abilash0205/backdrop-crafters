import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-300">
      <ul className="flex items-center justify-center space-x-8 text-xl">
        <li className="m-2">
          <Link to="/clipdropapi">Image Editing</Link>
        </li>
        <li className="m-2">
          <Link to="/batteryapi">Battery Status</Link>
        </li>
        {/* <li className="m-2">
          <Link to="fakerapi">Random User Data</Link>
        </li> */}
        <li className="m-2">
          <Link to="/unsplashapi">Image Generator</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
