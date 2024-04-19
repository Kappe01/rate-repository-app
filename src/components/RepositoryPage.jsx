import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import Text from "./Text";
import { FlatList, View, StyleSheet } from "react-native";
import useRepository from "../hooks/useRepository";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  topContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ratingContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: "blue",
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  countItem: {
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  languageText: {
    color: "white",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryPageContainer = ({ repository }) => {
  return <RepositoryItem repository={repository} />;
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.ratingContainer}>
          <Text fontWeight="bold" color="blue">
            {review.rating}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
          >
            {review.user.username}
          </Text>
          <Text style={styles.descriptionText} color="textSecondary">
            {review.createdAt.split("T")[0]}
          </Text>
        </View>
      </View>
      <View>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const RepositoryPage = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository({ id });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  console.log(repository);
  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryPageContainer repository={repository} />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryPage;
