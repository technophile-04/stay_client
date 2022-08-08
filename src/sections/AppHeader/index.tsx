import { Layout } from "antd";
import { Link } from "react-router-dom";
import { Viewer } from "../../lib/types";
import { MenuItems } from "./components";

/* ========== Layouts ========== */
const { Header } = Layout;

/* ========== Component Props ========== */
interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

/* ========== Component ========== */
export const AppHeader = ({ viewer, setViewer }: Props) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <h1>STAY</h1>
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Header>
  );
};
