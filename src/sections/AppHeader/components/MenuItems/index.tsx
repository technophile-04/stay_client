import { HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Menu } from "antd";
import { useMutation } from "react-apollo";
import { Link } from "react-router-dom";
import { LOG_OUT } from "../../../../lib/graphql/mutations";
import { LogOut as LogOutData } from "../../../../lib/graphql/mutations/LogOut/__generated__/LogOut";
import { Viewer } from "../../../../lib/types";
import { displayErrorMessage, displaySuccessNotification } from "../../../../lib/utils";

/* ========== Layout ========== */
const { Item, SubMenu } = Menu;

/* ========== Component Props ========== */
interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

/* ========== Component ========== */
export const MenuItems = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem("token");
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: () => {
      displayErrorMessage("Sorry we weren't able to log you out, Please try again later!");
    },
  });

  const handleLogOut = () => {
    logOut();
  };

  /* helper component */
  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item key="/user">
          <Link to={`/user/${viewer.id}`}>
            <UserOutlined />
            Profile
          </Link>
        </Item>
        <Item key="/logout">
          <div onClick={handleLogOut}>
            <LogoutOutlined />
            LogOut
          </div>
        </Item>
      </SubMenu>
    ) : (
      <Item key="/login">
        <Link to="/login">
          <Button type="primary"> Login </Button>
        </Link>
      </Item>
    );

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/host">
        <Link to="/host">
          <HomeOutlined /> Host
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
