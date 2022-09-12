import { Avatar, Button, Card, Divider, Typography } from "antd";

import { User as UserData } from "../../../../lib/graphql/queries/User/__generated__/user";

interface Props {
  user: UserData["user"];
  viewerIsUser: boolean;
}

const { Paragraph, Text, Title } = Typography;

export const UserProfile = ({ user, viewerIsUser }: Props) => {
  const additionalDetailsSection = viewerIsUser ? (
    <>
      <Divider />
      <Paragraph>Interested in becoming a STAY host? Register with your Stripe account!</Paragraph>
      <Button type="primary" className="user-profile__details-cta">
        Connect with Stripe
      </Button>
      <Paragraph type="secondary">
        STAY uses{" "}
        <a href="https://stripe.com/en-US/connect" target="_blank" rel="noopener noreferrer">
          Stripe
        </a>{" "}
        to help transfer your earnings in a secure and truster manner.
      </Paragraph>
    </>
  ) : null;

  return (
    <div className="user-profile">
      <Card className="user-profile__card">
        <div className="user-profile__avatar">
          <Avatar size={100} src={user.avatar} />
        </div>
        <Divider />
        <div className="user-profile__details">
          <Title level={4}>Details</Title>
          <Paragraph>
            Name: <Text strong>{user.name}</Text>
          </Paragraph>
          <Paragraph>
            Contact: <Text strong>{user.contact}</Text>
          </Paragraph>
        </div>
        {additionalDetailsSection}
      </Card>
    </div>
  );
};
