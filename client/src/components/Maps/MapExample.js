import React from "react";

function MapExample() {
  return (
    <>
      <div className="relative w-full rounded h-600-px">
        <div className="rounded h-full">
          <iframe
            width="100%"
            id="iframe"
            height="600"
            src="https://maps.google.com/maps?q=9.0192,38.7525&hl=es;&z=9&amp;output=embed"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default MapExample;
