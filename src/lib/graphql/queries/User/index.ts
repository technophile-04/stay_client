import { gql } from "apollo-boost";

export const USER = gql`
  query User($id: ID!, $bookingPage: Int!, $listingPage: Int!, $limit: Int!) {
    user(id: $id) {
      id
      name
      contact
      hasWallet
      income
      avatar
      bookings(limit: $limit, page: $bookingPage) {
        total
        result {
          id
          listing {
            id
            title
            image
            address
            price
            numOfGuests
          }
          checkIn
          checkOut
        }
      }

      listings(limit: $limit, page: $listingPage) {
        total
        result {
          id
          title
          image
          address
          price
          numOfGuests
        }
      }
    }
  }
`;
