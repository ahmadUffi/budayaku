import React from "react";
import RenderThree from "./RenderThree";

const Section = ({ reverse = false, desc, gambar3d, title }) => {
  return (
    <div>
      <div
        className={`grid md:grid-cols-2 mt-5 items-center overview-indonesia relative z-40 `}
        id="shadow-blur"
      >
        <div
          className={`${
            !reverse ? "order-1" : "order-2"
          }  threed relative z-30`}
        >
          <RenderThree
            glb={gambar3d}
            scale={0.2}
            rt={30}
            rz={-0.28}
            shadow={true}
            height="400px"
            scaleShadow={6}
            opacityShadow={0.2}
            positionShadow={-1}
          />
        </div>
        <div
          className={`${
            !reverse ? "order-2" : "order-1"
          }  text-black flex flex-col items-center p-10 relative z-30 `}
        >
          <h1 className="text-katulistiwa font-bold tracking-widest md:text-6xl uppercase text-3xl">
            {title}
          </h1>
          <p className="text-justify  mt-5">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Section;
