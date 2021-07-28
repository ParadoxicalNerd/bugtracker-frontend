import { useMutation } from "urql";

const ticketMutatorQuery = `
mutation UpdateTicket ($ticketID: ID!, $data: TicketUpdateInput!) {
    updateTicket (ticketID: $ticketID, data: $data){
      id
      title
    }
  }
`;

export default () => useMutation(ticketMutatorQuery);
