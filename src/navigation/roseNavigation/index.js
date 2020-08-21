import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../views/rose";
import { COLOR } from "../../utils/color/colors";

import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../utils/helper/size.helper";
import Notification from "../../views/notification";
import {
  HeaderLeftComponet,
  HeaderRightComponet,
  HeaderRightTool,
} from "../../components/header";
import Carts from "../../views/carts";

import ChildListItem from "../../views/home/childitem";
import { connect } from "react-redux";
import { View } from "native-base";
import { Tooltip } from "react-native-elements";
import DetailProducts from "../../views/home/listItem/details";
import DetailAddressCart from "../../views/carts/addresscart";
import ListCountries from "../../views/orders/collaborator/countries";
import ListDistrict from "../../components/district";
import Test from "../../components/test";
import ListDistrictChild from "../../components/districtChild";
import { Badge, Text } from "react-native-paper";
import SubChildItem from "../../views/home/subchilditem";
import ComponentTrend from "../../views/products/trend";
import NameItems from "../../views/home/nameitem";
import IconComponets from "../../components/icon";
import NewItem from "../../views/products/newitem";


import { useNavigation, DrawerActions } from '@react-navigation/native'
import AppNavigation from '../'
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();



MyHomeStack = (props) => {
  const { status, navigation, route, authUser, listItem, countNotify } = props;
  console.log({ props });
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          title: "",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height:50,
          },
          headerTitleStyle: {
            color: COLOR.HEADER,
          },
          headerTitle:()=>{
              return (
                    <Text style={{textAlign:'center',fontSize:18,color:'white'}}>Hoa hồng</Text>
              )
          },
          headerLeft: () => (
              <TouchableOpacity onPress={()=> navigation.openDrawer()}>
                  <Image 
                    source={require('../../assets/images/list.png')}
                    style={{
                      width:25,
                      height:22,
                      marginLeft:10
                    }}
                  />

              </TouchableOpacity>
            
          ),
          headerRight: () => {  
            return (
              <View style={{ flexDirection: "row"}}>
                <HeaderRightTool
                  navigation={navigation}
                  onPress={() => navigation.navigate("Giỏ hàng")}
                  name="bell"
                  size={sizeFont(6)}
                  color="#fff"
                  soild
                />
              </View>
            );
          },
        })}
      />


      <HomeStack.Screen
        name="Thông báo"
        component={Notification}
        options={{
          headerTitleAlign: "center",
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("Home")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => null}
              name="list"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  
});

const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    listItem: state.order.listItem,
    countNotify: state.notify.countNotify,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHomeStack);
