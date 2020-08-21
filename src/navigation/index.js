import * as React from "react";
import { Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/FontAwesome5Pro";
import MyHomeStack from "./homeNavigation";
import MyAccountStack from "./accountNavigation";
import { connect } from "react-redux";
import MyProductUserStack from "./productUserNavigation";
import { sizeWidth, sizeFont } from "../utils/helper/size.helper";
import RoseNavigation from '../navigation/roseNavigation'
import startOneNavigation from './startNavigation/startOne'
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavi=()=>(
  <View>
    <Text>stack one</Text>
  </View>
)

const AppStack = (props) => (
  props.status==="3"?(
  <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name == "Home") {
              return (
                <Icon
                  name={"home"}
                  size={sizeFont(6)}
                  color={color}
                  solid
                />
              );
            } else if (route.name == "order") {
              return (
                <Icon
                  name={"shopping-bag"}
                  size={sizeFont(6)}
                  color={color}
                  solid
                />
              );
            }
            else if (route.name == "account")
              return (
                <Icon name={"dropbox"} size={sizeFont(6)} color={color} />
              );
            else if (route.name == "rose")
            return (
              <Icon name={"wallet"} size={sizeFont(6)} color={color} />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#E1AC06",
          inactiveTintColor: "#969696",
          tabStyle: {
            backgroundColor: "white",

          },
          labelStyle: {
            flex: 1,
            fontSize: 13,
          },
          labelPosition: "below-icon",
          style: {
            paddingTop: 10,
            height: '9%',
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={MyHomeStack}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="order"
          component={MyProductUserStack}
          options={{ title: "Đơn hàng" }}
        />
        <Tab.Screen
          name="account"
          component={MyAccountStack}
          options={{ title: "Sản phẩm" }}
        />
        <Tab.Screen
          name="rose"
          component={RoseNavigation}
          options={{ title: "Hoa hồng" }}
        />
       
      </Tab.Navigator>):(<StackNavi />)
  )


const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="BottomTab"
  >
  <Drawer.Screen
      title='Home'
      component={AppStack}
      name="home"
  />
  <Drawer.Screen
      title="Thông tin CTV"
      component={MyAccountStack}
      name="ctv"
  />
  </Drawer.Navigator>
)
function AppNavigation(props) {
  return (
    <NavigationContainer>
        <DrawerNavigator />
    </NavigationContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigation);
