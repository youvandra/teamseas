import React, { useContext, useEffect, useState } from "react";
import Banner from "components/Home/Banner";
import Desc from "components/Home/Desc";
import Team from "components/Home/Team";
import ShowCase from "components/Home/Showcase";
import Roadmap from "components/Home/Roadmap";
import Project from "components/Home/Project";

import Faq from "components/Home/Faq";
import Zoom from "react-reveal/Zoom";
import { Hooks } from "providers";
function Index() {
  const { timer, setTimer } = useContext(Hooks);

  return (
    <>
      <div className="wrap-body">
        <Zoom top>
          <Banner />
        </Zoom>
        <div className="position-relative">
          <div
            id="project"
            className="position-absolute"
            style={{
              top: "-70px",
            }}
          />
        </div>
        <div
          id="project"
          name="project"
          className=""
          style={{
            background: "#f5f5f5",
            paddingTop: "30px",
            paddingBottom: "70px",
          }}
        >
          <Project />
        </div>
        <div className="position-relative">
          <div
            id="roadmap"
            className="position-absolute"
            style={{
              top: "-70px",
            }}
          ></div>
        </div>
        <div
          id="roadmap"
          name="roadmap"
          className="roadmap"
          style={{
            color: "#000000",
            paddingTop: "50px",
            paddingBottom: "70px",
          }}
        >
          {/* <Faq /> */}
          <Roadmap />
        </div>
      </div>
    </>
  );
}

export default Index;
