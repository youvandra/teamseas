import React, { useContext, useRef, useState } from "react";
import { Hooks } from "providers";
import { Link, useLocation } from "react-router-dom";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import styled from "styled-components";
import Connect from "components/Transactions";
import Discord from "assets/img/icons8-discord.svg";
import Twitter from "assets/img/icons8-twitter.svg";
import LogoNavbar from "assets/img/logo_navbar.png";
function Navbar() {
  const { pathname } = useLocation();
  const { setScroll, scroll, barMobile, setBarMobile, wallet_, setWallet_ } =
    useContext(Hooks);
  const ConnectButton = styled(WalletDialogButton);
  const myRefname = useRef(null);
  const handleClick = () => {
    myRefname.current.focus();
  };
  return (
    <>
      <div
        // className={`navbar active`}
        className={`navbar px-3 sticky-top d-md-flex d-none flex-row  justify-content-between ${
          scroll && "active"
        }`}
        style={{ zIndex: "999999" }}
      >
        <div className="navbar-icon">
          <img
            src={LogoNavbar}
            alt=""
            style={{
              maxWidth: "170px",
              maxHeight: "390x",
            }}
          />
        </div>
        <div
          style={{
            opacity: 1,
          }}
        >
          <ul className="">
            {/* <div style={{ display: "block" }} ref={myRefname}>
              {!wallet_ && <Connect />}
            </div> */}
            <li>
              <a href="#banner">HOME</a>
            </li>
            <li>
              <a href="#project">ABOUT</a>
            </li>
            <li>
              <a href="#roadmap">ROADMAP</a>
            </li>
            {/* <li>
              <a>{!wallet_ && <Connect navbar={true} mobile={false} />}</a>
            </li> */}

            {/* <li>
              <a href="https://twitter.com/internetkidsio">
                <img src={Twitter} alt="" width="25" />
              </a>
            </li>
            <li>
              <a href="https://discord.gg/bkWJHedf3X">
                <img src={Discord} alt="" width="25" />
              </a>
            </li> */}
          </ul>
        </div>
        <div className="btn-join-discord d-flex justify-content-center align-items-center">
          JOIN THE DISCORD
        </div>
      </div>
    </>
  );
}

export default Navbar;
