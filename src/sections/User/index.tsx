import { Col, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useQuery } from "react-apollo";
import { useParams } from "react-router-dom";
import { USER } from "../../lib/graphql";
import { User as UserData, UserVariables } from "../../lib/graphql/queries/User/__generated__/user";
import { UserProfile } from "./components";

type UserParams = {
  id: string;
};

export const User = () => {
  const { id } = useParams<UserParams>();

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: id!,
    },
  });

  const user = data ? data.user : null;

  const userProfileElement = user ? <UserProfile user={user} /> : null;

  console.log(data);

  return (
    <Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
      </Row>
    </Content>
  );
};
