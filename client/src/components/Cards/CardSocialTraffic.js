import { useReadQuery } from "features/api/apiSlice";
import React from "react";
import { Link } from "react-router-dom";

// components

export default function CardSocialTraffic() {
  const {
    data: companies,
    isFetching: companiesIsFetching,
    isError: companiesIsError,
  } = useReadQuery({ url: "/user/companies", tag: ["companies"] });
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Sponsors
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link
                to="/admin/tables"
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Logo
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Title
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {companies?.data?.map((e, i) => {
                if (i < 5)
                  return (
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        <img
                          src={e?.logo}
                          className="w-8 h-8 rounded-full border"
                        />
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {e?.name}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i
                          className={`fas fa-arrow-up ${
                            e?.visible ? "text-emerald-500" : "text-orange-500"
                          } mr-4`}
                        ></i>
                        {e?.visible ? "Visible" : "Hidden"}
                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
