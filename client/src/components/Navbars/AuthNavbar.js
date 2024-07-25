import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("tedbabe_user"));

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className={`${
                props.type === "admin" ? "text-blueGray-500" : "text-white"
              } text-sm font-bold flex gap-2 leading-relaxed mr-4 py-2 whitespace-nowrap uppercase`}
              to="/"
            >
              <img src="logo.jpg" className="w-14 h-10 rounded-lg" />
              <div>
                <p>Tedbabe Hara</p>
                <p className="text-sm font-light">Heritages</p>
              </div>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              `lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none` +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul
              className={`flex flex-col lg:flex-row list-none ${
                props.type === "admin" ? "text-blueGray-500" : "text-white"
              } lg:ml-auto text-blueGray-700 ${
                props.type === "admin"
                  ? "lg:text-blueGray-500"
                  : "lg:text-white"
              } `}
            >
              {user && (
                <li className="flex items-center">
                  <a
                    className=" px-3 py-4 lg:hover:text-blueGray-200 lg:py-2 flex items-center text-xs uppercase font-bold"
                    href="/admin/dashboard"
                  >
                    Dashboard
                  </a>
                </li>
              )}
              <li className="flex items-center">
                <a
                  className=" px-3 py-4 lg:hover:text-blueGray-200 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/"
                >
                  Home
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className=" px-3 py-4 lg:hover:text-blueGray-200 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/about"
                >
                  About
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className=" px-3 py-4 lg:hover:text-blueGray-200 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/contact"
                >
                  Contact
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className=" px-3 py-4 lg:hover:text-blueGray-200 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/service"
                >
                  Services
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className=" bg-white rounded-md hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/project"
                >
                  Projects
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
