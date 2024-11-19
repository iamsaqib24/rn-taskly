import { StyleSheet, Alert, Text, View, TouchableOpacity } from "react-native";
import { theme } from "../theme";

import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
};

export function ShoppingListItem({ name, isCompleted, onDelete }: Props) {
  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => onDelete(),
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {name}
      </Text>
      <TouchableOpacity
        onPress={handleDelete}
        activeOpacity={0.8}
        // style={[
        //   styles.button,
        //   isCompleted ? styles.completedButton : undefined,
        // ]}
      >
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorCerulean,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey,
  },
  //   button: {
  //     backgroundColor: theme.colorBlack,
  //     borderRadius: 6,
  //     padding: 8,
  //   },
  //   buttonText: {
  //     color: theme.colorWhite,
  //     fontWeight: "bold",
  //     textTransform: "uppercase",
  //     letterSpacing: 1,
  //   },
  //   completedButton: {
  //     backgroundColor: theme.colorGrey,
  //   },
});
