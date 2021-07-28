import { useMutation } from "urql";

const userMutatorQuery = `
mutation UpdateUser ($data: UserUpdateInput) {
    updateUser (data: $data){
      id
      name
    }
  }
`;

export default () => useMutation(userMutatorQuery);
