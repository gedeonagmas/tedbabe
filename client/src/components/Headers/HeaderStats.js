import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import { useReadQuery } from "features/api/apiSlice";

export default function HeaderStats() {
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
      {/* Header */}
      <div className="relative bg-yellow-400 md:pt-32 pb-32 pt-20">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="ACTIVE PROJECTS"
                  statTitle={
                    projects?.data?.filter((e) => e.visible === true)?.length
                  }
                  statArrow="up"
                  statPercent={
                    (projects?.data?.filter((e) => e.visible === true)?.length /
                      companies?.data?.length) *
                    100
                  }
                  statPercentColor="text-emerald-500"
                  statDescripiron="Visible"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="HIDDEN PROJECTS"
                  statTitle={
                    projects?.data?.filter((e) => e.visible === false)?.length
                  }
                  statArrow="down"
                  statPercent={
                    (projects?.data?.filter((e) => e.visible === false)
                      ?.length /
                      companies?.data?.length) *
                    100
                  }
                  statPercentColor="text-red-500"
                  statDescripiron="Hidden"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="VISIBLE SPONSORS"
                  statTitle={
                    companies?.data?.filter((e) => e.visible === true)?.length
                  }
                  statArrow="up"
                  statPercent={
                    (companies?.data?.filter((e) => e.visible === true)
                      ?.length /
                      companies?.data?.length) *
                    100
                  }
                  statPercentColor="text-emerald-500"
                  statDescripiron="Visible"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="HIDDEN SPONSORS"
                  statTitle={
                    companies?.data?.filter((e) => e.visible === false)?.length
                  }
                  statArrow="down"
                  statPercent={
                    (companies?.data?.filter((e) => e.visible === false)
                      ?.length /
                      companies?.data?.length) *
                    100
                  }
                  statPercentColor="text-orange-500"
                  statDescripiron="Hidden"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
