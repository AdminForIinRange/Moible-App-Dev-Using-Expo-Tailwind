
// __        __    _       _       _   _            _         _             _       _                                   _       
// \ \      / /_ _| |_ ___| |__   | |_| |__   ___  | |_ _   _| |_ ___  _ __(_) __ _| |  _ __  _ __ ___  _ __   ___ _ __| |_   _ 
//  \ \ /\ / / _` | __/ __| '_ \  | __| '_ \ / _ \ | __| | | | __/ _ \| '__| |/ _` | | | '_ \| '__/ _ \| '_ \ / _ \ '__| | | | |
//   \ V  V / (_| | || (__| | | | | |_| | | |  __/ | |_| |_| | || (_) | |  | | (_| | | | |_) | | | (_) | |_) |  __/ |  | | |_| |
//    \_/\_/ \__,_|\__\___|_| |_|  \__|_| |_|\___|  \__|\__,_|\__\___/|_|  |_|\__,_|_| | .__/|_|  \___/| .__/ \___|_|  |_|\__, |
//                                                                                     |_|             |_|                |___/ 


import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Image } from "react-native";
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";


export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if (isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className=" bg-primary h-full ">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full  items-center px-4 ">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max--w-[380px] w-full h-[300px] "
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton // Calling the custom button component and passing the required props
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-[80%] mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
      {/* // changing the status bar color, 
      // look at the battery percentage and time, its light mode */}
    </SafeAreaView>
  );
}

