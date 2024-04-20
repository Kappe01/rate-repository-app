import useGetUserReviews from "../hooks/useGetUserReviews";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import Button from "./Button";
import { View, StyleSheet, FlatList } from "react-native";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { Alert } from "react-native";

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

const ReviewList = () => {
  const { reviews, loading, refetch } = useGetUserReviews();
  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = ({ id }) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            console.log(id);
            mutate({ variables: { deleteReviewId: id } });
            refetch();
          },
        },
      ]
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  console.log(reviews);
  const parsedReviews = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={parsedReviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} deleteReview={deleteReview} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const ReviewItem = ({ review, deleteReview }) => {
  const navigate = useNavigate();

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
            {review.repository.fullName}
          </Text>
          <Text style={styles.descriptionText} color="textSecondary">
            {review.createdAt.split("T")[0]}
          </Text>
        </View>
      </View>
      <View>
        <Text>{review.text}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          onPress={() => {
            navigate(`/${review.repositoryId}`);
          }}
        >
          View repository
        </Button>
        <Button
          style={{ backgroundColor: "red" }}
          onPress={() => {
            console.log("Delete review");
            deleteReview({ id: review.id });
          }}
        >
          Delete review
        </Button>
      </View>
    </View>
  );
};

export default ReviewList;
