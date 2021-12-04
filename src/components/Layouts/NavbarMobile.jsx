import { useContext, useEffect } from "react";
import { Hooks } from "providers";
import Connect from "components/Transactions";
//tesdfs
function NavbarMobile() {
  const { barMobile, setBarMobile, wallet_ } = useContext(Hooks);
  useEffect(() => {}, [barMobile]);
  return (
    <>
      <div className="navbar-mobile sticky-top">
        <nav role="navigation">
          <div>
            {/* {!wallet_ && <Connect />} */}
            {/* <a href="http://">
              <span className="connect">Connect Wallet</span>
            </a> */}
          </div>
          <div id="menuToggle" onClick={() => setBarMobile(!barMobile)}>
            <input type="checkbox" value={barMobile} checked={barMobile} />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu"></ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavbarMobile;
