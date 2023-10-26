/* eslint-disable @typescript-eslint/comma-dangle */
import { useEffect } from "react";

import imagesData from "./imagesData";

function App() {
  useEffect(() => {
    const minZoom = 1;
    const maxZoom = 2.04;
    const stepSize = 0.05;

    let currentZoom = 1;
    let srcCurrent = "img-1";

    const container = document.getElementById("img-container") as HTMLElement;

    const zoomImage = (direction: number) => {
      const newZoom = currentZoom + direction * stepSize;

      const imgCurrent = window.document.getElementById(
        srcCurrent
      ) as HTMLImageElement;

      const getIndex = +srcCurrent.slice(4);

      if (newZoom < minZoom) {
        console.log("prev img");

        if (getIndex === 1) return;

        const newIndex = getIndex - 1;

        srcCurrent = srcCurrent.slice(0, 4) + newIndex;

        const imgPrev = window.document.getElementById(
          srcCurrent
        ) as HTMLImageElement;

        imgCurrent.style.display = "none";

        imgPrev.style.display = "block";

        currentZoom = 2.04;

        return;
      }

      if (newZoom > maxZoom) {
        console.log("next img");

        const newIndex = +getIndex + 1;

        if (+getIndex === imagesData.length) return;

        srcCurrent = srcCurrent.slice(0, 4) + newIndex;

        const imgNext = window.document.getElementById(
          srcCurrent
        ) as HTMLImageElement;

        imgCurrent.style.display = "none";

        imgNext.style.display = "block";

        currentZoom = 1;

        return;
      }

      currentZoom = newZoom;

      const image = document.getElementById(srcCurrent) as HTMLElement;
      image.style.transform = "scale(" + currentZoom + ")";
    };

    container.addEventListener("wheel", function (event) {
      const direction = event.deltaY > 0 ? -1 : 1;
      zoomImage(direction);
    });
  }, []);

  return (
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      id="img-container"
    >
      {imagesData.map((src, index) => (
        <img
          key={`img-${index}`}
          src={src}
          id={`img-${index + 1}`}
          className={index === 0 ? "" : "hidden"}
          style={{
            width: "100%",
            height: "100%",
          }}
          draggable="false"
          alt={`img-${index + 1}`}
        />
      ))}
    </div>
  );
}

export default App;
