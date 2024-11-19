import {
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  View,
  Text,
} from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
};

const initialList: ShoppingListItemType[] = [
  {
    id: "1",
    name: "Coffee",
  },
  {
    id: "2",
    name: "Eggs",
  },
  {
    id: "3",
    name: "Bread",
  },
];

// const testData = new Array(1000).fill(null).map((item, index) => ({
//   id: String(index),
//   name: String(index),
// }));

export default function App() {
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialList);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        { id: new Date().toTimeString(), name: value },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setValue("");
    }
  };

  return (
    <FlatList
      renderItem={({ item }) => {
        return <ShoppingListItem name={item.name} />;
      }}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput
          value={value}
          onChangeText={setValue}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          placeholder="E.g. Coffee"
          style={styles.textInput}
        />
      }
      // data={testData}
      data={shoppingList}
      style={styles.container}
      stickyHeaderIndices={[0]}
      contentContainerStyle={styles.contentContainer}
    />

    // <ScrollView
    // >

    //   {shoppingList.map((item) => (
    //     <ShoppingListItem name={item.name} key={item.id} />
    //   ))}

    //   {/* <ShoppingListItem name="Whoop Band" />
    //   <ShoppingListItem name="iPad" isCompleted /> */}

    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 12,
    // justifyContent: "center",
  },
  contentContainer: {
    paddingTop: 24,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
