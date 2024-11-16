// import { Stack } from "expo-router";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Layout() {
  return (
    // Stack & Modal Navigation

    // <Stack>
    //   <Stack.Screen name="index" options={{ title: "Shopping List" }} />
    //   <Stack.Screen
    //     name="counter"
    //     options={{ title: "Counter", presentation: "modal", animation: "fade" }}
    //   />
    //   <Stack.Screen
    //     name="idea"
    //     options={{ title: "Idea", presentation: "modal" }}
    //   />
    // </Stack>

    // Tabs Navigation

    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Shopping List",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: "Counter",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="clock" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          title: "Idea",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="lightbulb" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
