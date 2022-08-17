import { Card, Layout, Spin, Typography } from "antd";
import { useEffect, useRef } from "react";
import { useApolloClient, useMutation } from "react-apollo";
import { Navigate } from "react-router-dom";
import { ErrorBanner } from "../../lib/components";
import { AUTH_URL } from "../../lib/graphql";
import { LOG_IN } from "../../lib/graphql/mutations";
import {
  LogIn as LogInData,
  LogInVariables,
} from "../../lib/graphql/mutations/LogIn/__generated__/LogIn";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";
import { Viewer } from "../../lib/types";
import { displayErrorMessage, displaySuccessNotification } from "../../lib/utils";

/* ========== Assets ========== */
import googleLogo from "./assets/google_logo.jpg";

/* ========== Layouts ========== */
const { Content } = Layout;
const { Text, Title } = Typography;

/* ========== Component Props ========== */
interface Props {
  setViewer: (viewer: Viewer) => void;
}

/* ========== Component ========== */
export const LogIn = ({ setViewer }: Props) => {
  const client = useApolloClient();

  /* Query for authURL */
  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      });
      window.location.href = data.authUrl;
    } catch (error) {
      displayErrorMessage("Sorry! We weren't able to log you in!, please try again later.");
      console.log(error);
    }
  };

  const [login, { data: logInData, loading: logInLoading, error: logInError }] = useMutation<
    LogInData,
    LogInVariables
  >(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        if (data.logIn.token) {
          sessionStorage.setItem("token", data.logIn.token);
          displaySuccessNotification("You have successfully logged in!");
        } else {
          sessionStorage.removeItem("token");
          displayErrorMessage("Error logging In");
        }
      }
    },
  });

  /* Refs */
  const logInRef = useRef(login);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      logInRef.current({ variables: { input: { code } } });
    }
  }, []);

  /* Handling error, loading */
  if (logInLoading) {
    return (
      <Content className="log-in">
        <Spin size="large" tip="Logging you in..." />
      </Content>
    );
  }

  const logInErrorBannerElement = logInError ? (
    <ErrorBanner description="Sorry! We weren't able to log you in!, please try again later." />
  ) : null;

  /* Navigating once logged in */
  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;
    return <Navigate to={`/user/${viewerId}`} />;
  }

  return (
    <Content className="log-in">
      {logInErrorBannerElement}
      <Card className="log-in-card">
        <div className="log-in-card__intro ">
          <Title level={3} className="log-in-card__intro-title">
            <span role={"img"} aria-label="wave">
              👋
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            <span role={"img"} aria-label="wave">
              Log In to Stay!
            </span>
          </Title>
          <Text>Sign in with Google to start booking available rentals! </Text>
        </div>
        <button className="log-in-card__google-button" onClick={handleAuthorize}>
          <img src={googleLogo} alt="Google Logo" className="log-in-card__google-button-logo" />
          <span className="log-in-card__google-button-text">Sign in with Google</span>
        </button>
        <Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent form to sign in with your
          Google account.
        </Text>
      </Card>
    </Content>
  );
};
