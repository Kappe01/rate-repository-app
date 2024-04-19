import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = ({ id }) => {
  console.log("id", id);
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });
  console.log(loading);
  const repository = data ? data.repository : null;

  return { repository, loading, refetch, error };
};

export default useRepository;
