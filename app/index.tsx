import { StyleSheet, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";

export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingListItem name="New Balance 9060" />
      <ShoppingListItem name="Whoop Band" />
      <ShoppingListItem name="iPad" isCompleted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
