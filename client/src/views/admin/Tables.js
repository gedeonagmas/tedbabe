import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import { useReadQuery } from "features/api/apiSlice";

export default function Tables() {
  const {
    data: projects,
    isFetching: projectsIsFetching,
    isError: projectsIsError,
  } = useReadQuery({ url: "/user/projects", tag: ["projects"] });

  const {
    data: companies,
    isFetching: companiesIsFetching,
    isError: companiesIsError,
  } = useReadQuery({ url: "/user/companies", tag: ["companies"] });

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable color="light" data={projects} />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" data={companies} />
        </div>
      </div>
    </>
  );
}
