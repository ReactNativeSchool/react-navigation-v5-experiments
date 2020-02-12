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

import { AuthContext, ThemeContext } from "./context";
import {
  Home,
  Details,
  Search,
  Profile,
  Splash,
  SignIn,
  CreateAccount
} from "./Screens";

const HomeStack = createStackNavigator();
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
  </SearchStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={Profile} />
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

class App extends React.Component {
  state = {
    isLoading: true,
    userToken: null,
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

  // TODO: I don't want a navigation animation when switching states (drawer => auth stack). How?
  render() {
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
              {this.state.isLoading ? (
                <Splash />
              ) : this.state.userToken === null ? (
                <AuthStackScreen />
              ) : (
                <DrawerScreen />
              )}
            </NavigationContainer>
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </View>
    );
  }
}

export default App;
