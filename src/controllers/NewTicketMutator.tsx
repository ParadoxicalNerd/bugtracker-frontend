import { useMutation } from "urql";
import { TicketCreateInput } from "../models";

const NewTicketQuery = `
    mutation CreateTicket ($userID: ID!, $projectID: ID!, $data: TicketCreateInput!) {
        createTicket(authorID: $userID, projectID:$projectID, data: $data){
        id
        title
        }
    }
`;

// const newTicketMutator = (userID: string, projectID: string, data: TicketCreateInput) => {
//     const [result, mutation] = useMutation(NewTicketQuery);

//     const variables = {
//         authorID: userID,
//         projectID,
//         data,
//     };

//     return mutation(variables);
// };

export default () => useMutation(NewTicketQuery);
