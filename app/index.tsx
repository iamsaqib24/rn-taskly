import {
  StyleSheet,
  TextInput,
  FlatList,
  View,
  Text,
  LayoutAnimation,
} from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

const storageKey = "shopping-list";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

// const initialList: ShoppingListItemType[] = [
//   {
//     id: "1",
//     name: "Coffee",
//   },
//   {
//     id: "2",
//     name: "Eggs",
//   },
//   {
//     id: "3",
//     name: "Bread",
//   },
// ];

// const testData = new Array(1000).fill(null).map((item, index) => ({
//   id: String(index),
//   name: String(index),
// }));

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShoppingList(data);
      }
    };
    fetchInitial();
  }, []);

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        {
          id: new Date().toTimeString(),
          name: value,
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(newShoppingList);
      saveToStorage(storageKey, shoppingList);
      setValue("");
    }
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    saveToStorage(storageKey, shoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
  };

  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          lastUpdatedTimestamp: Date.now(),
          completedAtTimestamp: item.completedAtTimestamp
            ? undefined
            : Date.now(),
        };
      }
      return item;
    });
    saveToStorage(storageKey, shoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList
      renderItem={({ item }) => {
        return (
          <ShoppingListItem
            name={item.name}
            isCompleted={Boolean(item.completedAtTimestamp)}
            onToggleComplete={() => handleToggleComplete(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        );
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
      data={orderShoppingList(shoppingList)}
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

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp;
    }

    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1;
    }

    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1;
    }

    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
    // justifyContent: "center",
  },
  contentContainer: {
    paddingBottom: 24,
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
