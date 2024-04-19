import { View, ScrollView, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: "row",
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: "white",
  },
});

const CurrentUser = () => {
  const { data } = useQuery(GET_CURRENT_USER);
  console.log(data);
  return data ? data.me : null;
};

const AppBarTab = ({ children, ...props }) => {
  return (
    <Link style={styles.tabTouchable} {...props}>
      <View style={styles.tabContainer}>
        <Text fontWeight="bold" style={styles.tabText}>
          {children}
        </Text>
      </View>
    </Link>
  );
};

const AppBar = () => {
  const currentUser = CurrentUser();
  console.log(currentUser);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {currentUser ? (
          <AppBarTab to="/review">Create a review</AppBarTab>
        ) : null}
        {!currentUser ? (
          <AppBarTab to="/sign-in">Sign in</AppBarTab>
        ) : (
          <AppBarTab to="/sign-out">Sign out</AppBarTab>
        )}
        {!currentUser ? <AppBarTab to="/sign-up">Sign up</AppBarTab> : null}
      </ScrollView>
    </View>
  );
};

export default AppBar;
