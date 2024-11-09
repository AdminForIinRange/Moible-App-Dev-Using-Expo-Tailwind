import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Alert, Image } from "react-native";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  // Initializes form state to keep track of input values
  // `username`, `email`, and `password` are initially empty strings
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);
  // Handles the submission of form data when the user clicks "Sign Up"
  const submit = async () => {

    console.log(form);

    // Remove any spaces or non-alphanumeric characters from the form inputs
    const username = form.username.replace(/ /g, "");
    const email = form.email.replace(/ /g, "");
    const password = form.password.replace(/ /g, "");


    console.log(email, password, username);


    // Alerts the user if any fields are empty
    if (!username || !email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }

    // Sets loading state to true while submitting
    setSubmitting(true);

    try {
      // Calls createUser with the sanitized form data for signup
      const result = await createUser(email, password, username);
      router.replace("/home"); 
      // Alerts the user if the signup was successful
    } catch (error) {
      // Alerts the user if an error occurs
      Alert.alert("Error", error.message);
    } finally {
      // Resets loading state after attempt
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[50vh] justify-center px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to Aora
          </Text>

          {/* FormField component for entering the username */}
          {/* `value` prop reads from form state, displaying `form.username` as input value */}
          {/* `handleChangeText` updates `username` in form state when the user types */}
          <FormField
            title="Username"
            value={form.username} // Display current username value from state
            handleChangeText={(e) => setForm({ ...form, username: e })} // Update username in form state on change
            otherStyles="mt-10"
          />

          {/* FormField component for entering the email */}
          {/* Similar pattern as `username`, but updating `email` */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          {/* FormField component for entering the password */}
          {/* Similar pattern as above, but updating `password` */}
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          {/* CustomButton to trigger the `submit` function */}
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            // Loading spinner can be shown when `isSubmitting` is true
            // isLoading={isSubmitting}
          />

          {/* Link to Login page if the user already has an account */}
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
