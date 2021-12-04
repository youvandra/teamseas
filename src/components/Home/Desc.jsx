import React, { useContext } from "react";
import { Hooks } from "providers";
import Dot from "assets/img/sevenDeadlySins/icons/plus.gif";
import url3 from "assets/img/sevenDeadlySins/internetkids_gif.gif";
function Desc() {
  const { barMobile, setBarMobile } = useContext(Hooks);
  return (
    <>
      <div className="home-desc" id="home-desc">
        <div className="container d-flex flex-column-reverse flex-md-row mx-auto justify-content-center align-items-center">
          <div className="col-md-6 col-12 text-md-left text-left">
            <h3 className="text-left super mb-md-4 mb-0 text-md-left text-center">
              Internet Kids Social Club Perks (For IK NFT Holders)
            </h3>
            <div className="d-flex ">
              <div className="col-auto pl-0 ml-0">
                <img src={Dot} alt="" height="34px" width="34px" />
              </div>
              <div className="col">
                <h2 className="pt-0 mt-0 mb-0 pb-0">
                  Access to Every Clothing Drop & Discounts (Early Access to
                  Public Drops)
                </h2>
              </div>
            </div>
            <div className="d-flex pt-4 ">
              <div className="col-auto pl-0 ml-0">
                <img src={Dot} alt="" height="34px" width="34px" />
              </div>
              <div className="col">
                <h2 className="pt-0 mt-0 mb-0 pb-0">
                  Access to Internet Kids Events
                </h2>
              </div>
            </div>
            <div className="d-flex  pt-4">
              <div className="col-auto pl-0 ml-0">
                <img src={Dot} alt="" height="34px" width="34px" />
              </div>
              <div className="col">
                <h2 className="pt-0 mt-0 mb-0 pb-0">
                  Access to Exclusive Internet Kids Podcast Episodes
                </h2>
              </div>
            </div>
            <div className="d-flex  pt-4">
              <div className="col-auto pl-0 ml-0">
                <img src={Dot} alt="" height="34px" width="34px" />
              </div>
              <div className="col">
                <h2 className="pt-0 mt-0 mb-0 pb-0">
                  Access to Private Discord Channels
                </h2>
              </div>
            </div>
            <div className="d-flex  pt-4">
              <div className="col-auto pl-0 ml-0">
                <img src={Dot} alt="" height="34px" width="34px" />
              </div>
              <div className="col">
                <h2 className="pt-0 mt-0 mb-0 pb-0">Giveaways and Airdrops</h2>
              </div>
            </div>
            <div className="d-flex  pt-4">
              <div className="col-auto pl-0 ml-0">
                <img src={Dot} alt="" height="34px" width="34px" />
              </div>
              <div className="col">
                <h2 className="pt-0 mt-0 mb-0 pb-0">Access to play The Game</h2>
              </div>
            </div>
            {/* <div className="d-flex ">
              <div className="col-auto pl-0 ml-0">
                <img src={Dot} alt="" height="34px" width="34px" />
              </div>
              <div className="col">
                <h2 className="pt-0 mt-0 mb-0 pb-0">7Deadly</h2>
                <p
                  className="pt-0 mt-0"
                  style={{ fontSize: "16px", color: "#8E8E8E" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
                  adipisci? Ex incidunt sint in placeat totam qui veniam ipsum?
                  Dolores vitae nihil et ipsa minima dignissimos voluptate,
                  placeat esse illum?
                </p>
              </div>
            </div> */}
          </div>
          <div className="p-0 m-0 col-md-6 col-12 d-flex mx-auto w-100 justify-content-center align-items-center">
            <img src={url3} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Desc;
