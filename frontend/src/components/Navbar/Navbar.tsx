// import "./Navbar.scss";

export const Navbar = () => {
  return (
    <nav>
      <div className="left-nav d-flex align-items-center">
        <span className="bold-700">CONVENTIONAL / PARKEE Office Agent</span>
      </div>
      <div className="right-nav d-flex align-items-center">
        <button className="primary-btn nav-btn">Logout</button>
      </div>
    </nav>
  );
};
