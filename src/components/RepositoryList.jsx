import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState, useRef } from "react";
import Text from "./Text";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onValueChange,
  setSearchKeyword,
  pickerRef,
  selectedValue,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`${item.id}`)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <DropDownMenu
            onValueChange={onValueChange}
            setSearchKeyword={setSearchKeyword}
            pickerRef={pickerRef}
            selectedValue={selectedValue}
          />
        }
      />
    </>
  );
};

const DropDownMenu = ({
  pickerRef,
  selectedValue,
  onValueChange,
  setSearchKeyword,
}) => {
  return (
    <View>
      <TextInput
        placeholder="Search"
        onChangeText={(text) => setSearchKeyword(text)}
      />
      <Picker
        ref={pickerRef}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        <Picker.Item label="Latest repositories" value="Latest repositories" />
        <Picker.Item
          label="Highest rated repositories"
          value="Highest rated repositories"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="Lowest rated repositories"
        />
      </Picker>
    </View>
  );
};

const RepositoryList = () => {
  const [selectedValue, setSelectedValue] = useState("Latest repositories");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [value] = useDebounce(searchKeyword, 1000);

  const { repositories, loading, refetch } = useRepositories({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
    searchKeyword: value,
  });

  const pickerRef = useRef();

  const onValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    switch (itemValue) {
      case "Latest repositories":
        handleOrderByChange("CREATED_AT", "DESC");
        break;
      case "Highest rated repositories":
        handleOrderByChange("RATING_AVERAGE", "DESC");
        break;
      case "Lowest rated repositories":
        handleOrderByChange("RATING_AVERAGE", "ASC");
        break;
    }
  };

  const handleOrderByChange = (newOrderBy, newOrderDirection) => {
    refetch({
      orderBy: newOrderBy,
      orderDirection: newOrderDirection,
      searchKeyword: value,
    });
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      onValueChange={onValueChange}
      setSearchKeyword={setSearchKeyword}
      pickerRef={pickerRef}
      selectedValue={selectedValue}
    />
  );
};

export default RepositoryList;
