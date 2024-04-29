import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../components/Loader";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  //   const { loading, isLogged } = useGlobalContext();

  //   if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#8cf078" style="dark" />

      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
