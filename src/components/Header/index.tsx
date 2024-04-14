import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="Header">
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
