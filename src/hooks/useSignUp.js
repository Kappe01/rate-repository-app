import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [mutate] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    });
    return data;
  };

  return createUser;
};

export default useCreateUser;
