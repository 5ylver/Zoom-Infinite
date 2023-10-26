import { useEffect } from "react";
import { arkadia0, arkadia1, arkadia2, arkadia3, arkadia4 } from "./assets";

function App() {
  useEffect(() => {
    let currentZoom = 1;

    const minZoom = 1;
    const maxZoom = 2.04;
    const stepSize = 0.05;

    let srcCurrent = "img-1";

    const container = document.getElementById("image-container");

    const zoomImage = (direction: number) => {
      const newZoom = currentZoom + direction * stepSize;

      const imgCurrent = window.document.getElementById(
        srcCurrent
      ) as HTMLImageElement;

      if (newZoom < minZoom) {
        console.log("prev img");
        return;
      }

      if (newZoom > maxZoom) {
        console.log("next img");

        const getIndex = srcCurrent.slice(4);

        if (+getIndex === 5) return;

        const newIndex = +getIndex + 1;

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

    if (container != null) {
      container.addEventListener("wheel", function (event) {
        const direction = event.deltaY > 0 ? -1 : 1;
        zoomImage(direction);
      });
    }
  }, []);

  return (
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      id="image-container"
    >
      <img
        src={arkadia0}
        id="img-1"
        style={{ width: "100%", height: "100%" }}
        draggable="false"
        alt="img"
      />
      <img
        src={arkadia1}
        id="img-2"
        style={{ width: "100%", height: "100%", display: "none" }}
        draggable="false"
        alt="img-2"
      />
      <img
        src={arkadia2}
        id="img-3"
        style={{ width: "100%", height: "100%", display: "none" }}
        draggable="false"
        alt="img-3"
      />
      <img
        src={arkadia3}
        id="img-4"
        style={{ width: "100%", height: "100%", display: "none" }}
        draggable="false"
        alt="img-4"
      />
      <img
        src={arkadia4}
        id="img-5"
        style={{ width: "100%", height: "100%", display: "none" }}
        draggable="false"
        alt="img-4"
      />
    </div>
  );
}

export default App;
