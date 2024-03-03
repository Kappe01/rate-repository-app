import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";

const RepositoryItem = ({ item }) => {
  const style = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 10,
      backgroundColor: "white",
    },
    tinyLogo: {
      width: 50,
      height: 50,
      padding: 10,
    },
    info: {
      display: "flex",
      flexDirection: "row",
    },
    infoContent: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: 10,
      justifyContent: "space-between",
    },
    infoText: {
      fontSize: 16,
      display: "flex",
      paddingRight: 50,
    },
    fullName: {
      fontSize: 16,
    },
    language: {
      backgroundColor: "#0366d6",
      color: "white",
      padding: 5,
      borderRadius: 5,
      alignSelf: "flex-start",
    },
    stats: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
    },
    statsColumn: {
      display: "flex",
      flexDirection: "column",
    },
    statsText: {
      textAlign: "center",
      fontSize: 16,
    },
    otherText: {
      textAlign: "center",
      fontSize: 16,
    },
  });

  const stars =
    item.stargazersCount > 1000
      ? `${(item.stargazersCount / 1000).toFixed(1)}k`
      : item.stargazersCount;
  const forks =
    item.forksCount > 1000
      ? `${(item.forksCount / 1000).toFixed(1)}k`
      : item.forksCount;

  const StatsColumn = ({ count, label }) => (
    <View style={style.statsColumn}>
      <Text fontWeight="bold" style={style.statsText}>
        {count}
      </Text>
      <Text style={style.otherText}>{label}</Text>
    </View>
  );

  return (
    <View style={style.container}>
      <View style={style.info}>
        <Image style={style.tinyLogo} source={{ uri: item.ownerAvatarUrl }} />
        <View style={style.infoContent}>
          <Text fontWeight="bold" style={style.fullName}>
            {item.fullName}
          </Text>
          <Text style={style.infoText}>{item.description}</Text>
          <Text style={style.language}>{item.language}</Text>
        </View>
      </View>
      <View style={style.stats}>
        <StatsColumn count={stars} label="Stars" />
        <StatsColumn count={forks} label="Forks" />
        <StatsColumn count={item.reviewCount} label="Reviews" />
        <StatsColumn count={item.ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;
