import { gql } from "apollo-boost";
import React, { FunctionComponent } from "react";
// import { useMutation, useQuery } from "../../lib/api";
import { useMutation, useQuery } from "react-apollo";
// import { DeleteListingData, DeleteListingVariables, ListingsData } from "./types";
import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from "./__generated__/DeleteListing";
import { Avatar, Button, List, Spin } from "antd";
import "./styles/Listings.css";
import { ListingSkeleton } from "./components";

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

interface Props {
  title: string;
}

export const Listings: FunctionComponent<Props> = ({ title }) => {
  /* Using custom hooks */
  // const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);
  /* const [deleteListing, { loading: deleteListingLoading, error: deleteListingError }] = useMutation<
    DeleteListingData,
    DeleteListingVariables
  >(DELETE_LISTING); */

  /* React apollo */
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);
  const [deleteListing, { loading: deleteListingLoading, error: deleteListingError }] = useMutation<
    DeleteListingData,
    DeleteListingVariables
  >(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    deleteListing({
      variables: {
        id,
      },
    });
    refetch();
  };

  const listings = data ? data.listings : null;

  /* eslint-disable */
  {
    /* <ul>
  {listings.map((list) => (
    <li key={list.id}>
      {list.title}
      <button onClick={() => handleDeleteListing(list.id)}>Delte Listing</button>
    </li>
  ))}
</ul> */
  }

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => handleDeleteListing(item.id)}>
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={<a href="https://ant.design">{item.title}</a>}
            avatar={<Avatar src={item.image} shape="square" size={48} />}
            description={item.address}
          />
        </List.Item>
      )}
    />
  ) : null;

  const deleteListingErrorComp = deleteListingError ? <h4>Error in deleting</h4> : null;
  const deleteListingLoadingComp = deleteListingLoading ? <h4>Deleting...</h4> : null;

  if (error) {
    return <h1>Uh Oh! Something went wrong - please try again later : (</h1>;
  }

  if (loading) {
    // return <h1>Loading...</h1>;
    return (
      <div className="listings">
        <ListingSkeleton title={title} />
      </div>
    );
  }

  return (
    <div className="listings">
      <Spin spinning={deleteListingLoading}>
        <p>{title}</p>
        {listingsList}
        {deleteListingLoadingComp}
        {deleteListingErrorComp}
      </Spin>
    </div>
  );
};
