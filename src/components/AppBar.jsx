import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: "row",
    backgroundColor: "#24292e",
    height: 80,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    margin: 10,
  },
});

const AppBar = () => {
  const onPress = () => {
    console.log("Pressed");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link="/" text="Repositories" onPress={onPress} />
        <AppBarTab link="/signin" text="Sign In" onPress={onPress} />
      </ScrollView>
    </View>
  );
};

const AppBarTab = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <Link to={props.link}>
        <Text style={styles.text}>{props.text}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBar;
