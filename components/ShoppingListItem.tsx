import {
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";
import { theme } from "../theme";

import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
};

export function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
}: Props) {
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
    <Pressable
      onPress={onToggleComplete}
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <View style={styles.row}>
        <Entypo
          name={isCompleted ? "check" : "circle"}
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorCerulean}
        />
        <Text
          numberOfLines={1}
          style={[
            styles.itemText,
            isCompleted ? styles.completedText : undefined,
          ]}
        >
          {name}
        </Text>
      </View>
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
    </Pressable>
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
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
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
