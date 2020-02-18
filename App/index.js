import React from "react";
import { StatusBar, View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";

import { AuthContext, ThemeContext } from "./context";
import {
  Home,
  Details,
  Search,
  Search2,
  Profile,
  Splash,
  SignIn,
  CreateAccount
} from "./Screens";

enableScreens();

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name
      })}
    />
  </HomeStack.Navigator>
);

const SearchStack = createStackNavigator();
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile" lazy={false}>
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
  </AuthStack.Navigator>
);

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    buttonBackground: "#bb86fc",
    buttonText: "#fff"
  }
};

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    buttonBackground: "#147efb",
    buttonText: "#fff"
  }
};

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken === null ? (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          // animationTypeForReplace: "pop",
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          // animationTypeForReplace: "push",
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

class App extends React.Component {
  state = {
    isLoading: true,
    userToken: "asdf",
    isDarkTheme: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  authMethods = () => ({
    signIn: () => {
      this.setState({ isLoading: false, userToken: "asdf" });
    },
    signOut: () => {
      this.setState({ isLoading: false, userToken: null });
    },
    signUp: () => {
      this.setState({ isLoading: false, userToken: "asdf" });
    }
  });

  themeMethods = () => ({
    toggleTheme: () => {
      this.setState(state => ({ isDarkTheme: !state.isDarkTheme }));
    }
  });

  render() {
    if (this.state.isLoading) {
      return <Splash />;
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.isDarkTheme
            ? CustomDarkTheme.colors.background
            : CustomLightTheme.colors.background
        }}
      >
        <AuthContext.Provider value={this.authMethods()}>
          <ThemeContext.Provider value={this.themeMethods()}>
            {this.state.isDarkTheme ? (
              <StatusBar barStyle="light-content" />
            ) : (
              <StatusBar barStyle="dark-content" />
            )}
            <NavigationContainer
              theme={
                this.state.isDarkTheme ? CustomDarkTheme : CustomLightTheme
              }
            >
              <RootStackScreen userToken={this.state.userToken} />
            </NavigationContainer>
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </View>
    );
  }
}

export default App;
