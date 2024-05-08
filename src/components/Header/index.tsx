import { Link } from "react-router-dom";

import { usePageTransition } from "../../hooks/useTransitionPage";

const Header = () => {
  const { fadeOut } = usePageTransition();

  return (
    <>
      <header className={`Header ${fadeOut ? "fade-out" : "fade-in"}`}>
        <div className="Header--Content">
          <div>
            <h1>NotePay</h1>
          </div>
          <div>
            <Link to={"/"}>Início</Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
