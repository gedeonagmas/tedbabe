import React from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useReadQuery } from "features/api/apiSlice";

export default function Project() {
  const {
    data: projects,
    isFetching: projectsIsFetching,
    isError: projectsIsError,
  } = useReadQuery({ url: "/user/projects", tag: ["projects"] });

  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute flex items-center justify-center text-center top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/flagged/photo-1572644973628-e9be84915d59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
            <div className=" text-white text-4xl font-bold uppercase">
              Our Projects
            </div>
          </div>

          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>

        <section className="pt-20 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">
                  Here are our latest projects
                </h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  We've been working diligently for some time, and here are our
                  latest sample projects. These recent examples showcase the
                  depth of our experience and capabilities that we've built up
                  over the years through our client collaborations.
                </p>
              </div>
            </div>
            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
              {projects?.data?.map((e, i) => {
                return (
                  <div className="relative w-[400px] h-[300px] rounded-lg border">
                    <img
                      // onMouseOver={() => {
                      //   console.log("hover", i);
                      //   const id = document.getElementById(i);
                      //   id?.classList?.remove("hidden");
                      //   id?.classList?.add("flex");
                      // }}
                      // onMouseLeave={() => {
                      //   console.log("leave", i);

                      //   const id = document.getElementById(i);
                      //   id?.classList?.remove("flex");
                      //   id?.classList?.add("hidden");
                      // }}
                      src={e?.image}
                      className="w-full brightness-75 rounded-lg"
                    />
                    <div
                      id={i}
                      className="absolute w-[400px] h-7 bottom-2 right-2 rounded-lg bg-yellow-400/35 text-white items-center justify-center text-lg font-light duration-75 ease-in-out"
                    >
                      {e?.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
