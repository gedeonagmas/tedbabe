import Response from "components/Response";
import LoadingButton from "components/loading/LoadingButton";
import { useReadQuery } from "features/api/apiSlice";
import { useUpdateMutation } from "features/api/apiSlice";
import React, { useEffect, useState } from "react";

// components

export default function CardSettings() {
  const user = JSON.parse(localStorage.getItem("tedbabe_user"));

  const {
    data: users,
    isFetching,
    isError,
  } = useReadQuery({ url: `/user/users?_id=${user?._id}`, tag: ["users"] });

  const [updateData, updateResponse] = useUpdateMutation();
  const [pending, setPending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (users) {
      setName(users?.data[0]?.name ? users?.data[0]?.name : name);
      setEmail(users?.data[0]?.email ? users?.data[0]?.email : email);
    }
  });
  const updateHandler = () => {
    const data = { url: `/user/users?id=${user?._id}`, tag: ["users"] };
    if (password && password.length > 0) {
      data.password = password;
    }
    updateData(data);
  };

  return (
    <>
      <Response response={updateResponse} setPending={setPending} />
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Settings
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="gedeon agmas"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="gedion@gmail.com"
                  />
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Lucky"
                  />
                </div>
              </div>

              <div className="text-center w-full mt-6">
                <LoadingButton
                  pending={pending}
                  onClick={updateHandler}
                  title="Update"
                  color="bg-blue-500"
                  width="w-full py-3 text-lg"
                />
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />
          </form>
        </div>
      </div>
    </>
  );
}
