import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const useGetUserReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  const reviews = data ? data.me.reviews : null;

  return { reviews, loading, refetch, error };
};

export default useGetUserReviews;
