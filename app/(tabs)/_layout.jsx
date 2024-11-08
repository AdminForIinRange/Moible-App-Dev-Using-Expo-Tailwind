// The number of files inside the "tabs" folder determines the number of tabs displayed.
// For example, adding a test.jsx file to the "tabs" folder will add an extra 
//tab option in the localhost environment.

import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";

// basically we use this arrow function as a component to display the tab icons 
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => { // this is the main Layout
  return (
    <>
      <Tabs
        screenOptions={{
          // When the tab is active, set the text color to a bright orange
          tabBarActiveTintColor: "#FFA001",
          // When the tab is inactive, set the text color to a light gray
          tabBarInactiveTintColor: "#CDCDE0",
          // Hide the tab label
          tabBarShowLabel: false,
          // Customize the tab bar style
          tabBarStyle: {
            // Set the background color of the tab bar to a dark gray
            backgroundColor: "#161622",
            // Set the border top color to a slightly lighter gray
            borderTopColor: "#232533",
            // Set the height of the tab bar to 84 pixels
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home" // the name is the is the one that will be used in the URL
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => ( /* The tabBarIcon prop is a built-in Expo Router prop */ 
              <TabIcon
                icon={icons.home}
                color={color} 
                name="Home" 
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
