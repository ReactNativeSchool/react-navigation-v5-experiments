import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthContext } from "./authContext";
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

class App extends React.Component {
  state = {
    isLoading: true,
    userToken: null
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

  // TODO: I don't want a navigation animation when switching states (drawer => auth stack). How?
  render() {
    return (
      <AuthContext.Provider value={this.authMethods()}>
        <NavigationContainer>
          {this.state.isLoading ? (
            <Splash />
          ) : this.state.userToken === null ? (
            <AuthStackScreen />
          ) : (
            <DrawerScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}

export default App;
