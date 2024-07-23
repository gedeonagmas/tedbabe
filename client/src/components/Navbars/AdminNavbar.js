import React, { useEffect, useState } from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { useCreateMutation } from "features/api/apiSlice";
import Response from "components/Response";
import LoadingButton from "components/loading/LoadingButton";

export default function Navbar() {
  const [createData, createResponse] = useCreateMutation();

  const [add, setAdd] = useState(false);
  const [pending, setPending] = useState(false);
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const addHandler = () => {
    const formData = new FormData();
    type === "projects" && formData.append("image", image);
    type === "companies" && formData.append("logo", logo);
    type === "projects" && formData.append("title", title);
    type === "companies" && formData.append("name", name);
    formData.append("url", `/user/${type}`);
    formData.append("tag", [`${type}`]);

    createData(formData);
  };

  useEffect(() => {
    if (createResponse?.status === "fulfilled") {
      setAdd(false);
    }
  }, [createResponse]);

  return (
    <>
      <Response response={createResponse} setPending={setPending} />
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          {/* Form */}
          <div className="flex self-end justify-between gap-3 md:gap-10 w-[300px] items-center mx-1 md:mx-10">
            <div
              onClick={() => {
                setType("companies");
                setAdd(true);
              }}
              className="relative w-44 text-center items-center justify-center cursor-pointer hover:bg-gray-200 rounded-sm py-3 bg-white text-gray-500 flex"
            >
              Add new sponsor
            </div>

            <div
              onClick={() => {
                setType("projects");
                setAdd(true);
              }}
              className="relative w-44 text-center items-center justify-center cursor-pointer hover:bg-gray-200 rounded-sm py-3 bg-white text-gray-500 flex"
            >
              Add new project
            </div>
          </div>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
        {add && type && (
          <div
            style={{ left: "20%", top: "90%" }}
            className="absolute w-[600px] -ml-3 lg:ml-72 mt-20 z-30 h-[400px] bg-gray-200 p-10"
          >
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                {type === "companies" ? "Name" : "Title"}
              </label>
              <input
                onChange={(e) =>
                  type === "companies"
                    ? setName(e.target.value)
                    : setTitle(e?.target.value)
                }
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder={type === "companies" ? "Name" : "Title"}
              />
            </div>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                {type === "companies" ? "Logo" : "Image"}
              </label>
              <input
                onChange={(e) =>
                  type === "companies"
                    ? setLogo(e?.target.files[0])
                    : setImage(e.target.files[0])
                }
                type="file"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="image"
              />
            </div>
            <div className="text-center relative flex w-full justify-between mt-6">
              <p
                onClick={() => setAdd(false)}
                className="cursor-pointer p-2 border rounded-sm hover:bg-gray-200 bg-white text-black"
              >
                Close
              </p>
              <div>
                <LoadingButton
                  pending={pending}
                  onClick={addHandler}
                  title="Add"
                  color="bg-blue-500"
                  width="w-48 py-2 sm:rounded-md text-lg"
                />
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* End Navbar */}
    </>
  );
}
