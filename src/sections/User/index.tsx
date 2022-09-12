import { Col, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useState } from "react";
import { useQuery } from "react-apollo";
import { useParams } from "react-router-dom";
import { ErrorBanner, PageSkeleton } from "../../lib/components";
import { USER } from "../../lib/graphql";
import { User as UserData, UserVariables } from "../../lib/graphql/queries/User/__generated__/user";
import { Viewer } from "../../lib/types";
import { UserBookings, UserListings, UserProfile } from "./components";

interface Props {
  viewer: Viewer;
}

type UserParams = {
  id: string;
};

const PAGE_LIMIT = 4;

export const User = ({ viewer }: Props) => {
  const [bookingPage, setBookingPage] = useState(1);
  const [listingPage, setListingPage] = useState(1);

  const { id } = useParams<UserParams>();

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: id!,
      bookingPage,
      listingPage,
      limit: PAGE_LIMIT,
    },
  });

  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist or we may have encountered any error :(" />
        <PageSkeleton />
      </Content>
    );
  }

  const user = data ? data.user : null;

  const viewerIsUser = viewer.id === id;
  const userProfileElement = user ? <UserProfile user={user} viewerIsUser={viewerIsUser} /> : null;

  const userListings = user ? user.listings : null;
  const userBookings = user ? user.bookings : null;

  const userListingsElement = userListings && (
    <UserListings
      userListings={userListings}
      listingsPage={listingPage}
      limit={PAGE_LIMIT}
      setListingPage={setListingPage}
    />
  );

  const userBookingsElement = userListings && (
    <UserBookings
      userBookings={userBookings}
      bookingsPage={bookingPage}
      limit={PAGE_LIMIT}
      setBookingPage={setBookingPage}
    />
  );

  console.log(data);

  return (
    <Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
        <Col xs={24}>
          {userListingsElement}
          {userBookingsElement}
        </Col>
      </Row>
    </Content>
  );
};
