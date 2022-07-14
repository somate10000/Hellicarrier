import { gql } from "@apollo/client";

export const GetTrans = gql`
  {
    dates {
      id
      books {
        name
        category
        AV
        status
        reciever
        type
        amount
        date
      }
    }
  }
`;
