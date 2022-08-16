import { Layout } from "antd";
import { Link } from "react-router-dom";

/* ========== Layouts ========== */
const { Header } = Layout;

/* ========== Component ========== */
export const AppHeaderSkeleton = () => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <h1>STAY</h1>
        </div>
      </div>
    </Header>
  );
};
