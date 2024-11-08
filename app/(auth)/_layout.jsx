import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// import { Loader } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {


    return (
        <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
              headerShown: false,
            }}
            />
        <Stack.Screen
          name="sign-up"
          options={{
              headerShown: false,
            }}
            />
      </Stack>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;


/** so like a div
 * `Stack` is a built-in component from Expo Router that allows you to
 * create a stack of screens. A stack is a way to organize your app's
 * screens into a hierarchical structure. Each screen in the stack
 * can have its own navigation stack, and the user can navigate between
 * screens in the stack using the back button or by using the
 * `useNavigation` hook.
 *so liek a div
 * `Stack.Screen` is a component that wraps a screen component and
 * provides a way to customize the navigation options for that screen.
 * The `name` prop is used to identify the screen, and the `options`
 * prop is an object that can contain any of the following properties:
 */