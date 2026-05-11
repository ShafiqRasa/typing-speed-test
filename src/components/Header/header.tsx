import { Header } from "./header.style";

const NavBar = () => {
  return (
    <Header>
      <img src="/src/assets/images/logo-small.svg" alt="logo" />
      <div className="best-wpm">
        <img src="/src/assets/images/icon-personal-best.svg" alt="trophy" />
        <div>
          <p>
            <span>Best:</span> {0} WPM
          </p>
        </div>
      </div>
    </Header>
  );
};
export default NavBar;
