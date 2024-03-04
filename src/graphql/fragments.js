import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
  fragment CoreRepositoryFields on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;
