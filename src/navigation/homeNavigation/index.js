import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet, TextInput,Image } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../views/home";
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
            height: 90,
          },
          headerTitleStyle: {
            color: COLOR.HEADER,
          },
          headerTitle: () => {
            return (
              <TextInput
                placeholder="Tìm kiếm"
                returnKeyType="search"
                style={{
                  height: 40,
                  width: '90%',
                  borderColor: 'white',
                  borderWidth: 1,
                  backgroundColor: 'white'
                }}
              />
            )
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../../assets/images/list.png')}
                style={{
                  width: 28,
                  height: 28,
                  marginLeft: 12
                }}
              />

            </TouchableOpacity>
          ),
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row" }}>
                <HeaderLeftComponet
                  navigation={navigation}
                  onPress={() => navigation.navigate("Thông báo")}
                  name="shopping-cart"
                  size={sizeFont(6)}
                  color="#fff"
                />
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

      <HomeStack.Screen
        name="ComponentTrend"
        component={ComponentTrend}
        options={({ route }) => ({
          headerTitleAlign: "center",
          title: route.params.TITLE,
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
        })}
      />

      <HomeStack.Screen
        name="ChildListItem"
        component={ChildListItem}
        options={({ route }) => ({
          title: route.params.name,
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
        })}
      />
      <HomeStack.Screen
        name="Carts"
        component={Carts}
        options={({ route }) => ({
          headerTitleAlign: "center",
          title: "Giỏ hàng",
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
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => route.params.onDelete()}
              name="trash-alt"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />

      <HomeStack.Screen
        name="DetailAddressCart"
        component={DetailAddressCart}
        options={({ route }) => ({
          title: "Tạo đơn hàng",
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
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />

      <HomeStack.Screen
        name="DetailProducts"
        component={DetailProducts}
        options={({ route }) => ({
          title: "",
          headerTitleAlign: "center",
          headerBackTitle: null,
          // headerStyle: {
          //   backgroundColor: COLOR.HEADER,
          // },
          // headerTitleStyle: {
          //   color: "#fff",
          // },

          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#000"
              soild
            />
          ),
          headerRight: () => {
            if (status === "") {
              return null;
            } else
              return authUser.GROUPS === "3" ? (
                <View style={{ flexDirection: "row" }}>
                  <HeaderRightComponet
                    navigation={navigation}
                    onPress={() => navigation.navigate("Home")}
                    name="home"
                    size={sizeFont(6)}
                    color="#000"
                    style={{
                      marginRight: sizeWidth(-1),
                    }}
                  />
                  <HeaderRightComponet
                    navigation={navigation}
                    onPress={() => route.params.NAVIGATE()}
                    name="edit"
                    size={sizeFont(5)}
                    color="#000"
                    style={{
                      marginRight: sizeWidth(0),
                    }}
                  />
                </View>
              ) : (
                  <TouchableOpacity
                    style={{ flexDirection: "row", marginRight: sizeWidth(3) }}
                    onPress={() =>
                      navigation.navigate("Carts", {
                        NAME: "DetailProducts",
                      })
                    }
                  >
                    <HeaderLeftComponet
                      navigation={navigation}
                      onPress={() =>
                        navigation.navigate("Carts", {
                          NAME: "DetailProducts",
                        })
                      }
                      name="shopping-cart"
                      size={sizeFont(6)}
                      color="#000"
                    />
                    {listItem.length != 0 ? (
                      <View style={styles.viewList}>
                        <Text
                          style={{
                            color: "#fff",
                            textAlign: "center",
                            fontSize: sizeFont(3),
                          }}
                        >
                          {listItem.length} {console.log(listItem.length)}
                        </Text>
                      </View>
                    ) : null}

                    {/**<HeaderRightTool
                  navigation={navigation}
                  onPress={() => navigation.navigate("Giỏ hàng")}
                  name="edit"
                  size={sizeFont(6)}
                  color="#fff"
                  soild
                /> */}
                  </TouchableOpacity>
                );
          },
        })}
      />
      <HomeStack.Screen
        name="ListCountries"
        component={ListCountries}
        options={({ route }) => ({
          title: "Chọn Tỉnh/Thành phố",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        })}
      />
      <HomeStack.Screen
        name="ListDistrict"
        component={ListDistrict}
        options={({ route }) => ({
          title: "Chọn Quận/Huyện",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        })}
      />
      <HomeStack.Screen
        name="ListDistrictChild"
        component={ListDistrictChild}
        options={({ route }) => ({
          title: "Chọn Phường/Xã",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        })}
      />
      <HomeStack.Screen
        name="SubChildItem"
        component={SubChildItem}
        options={({ route }) => ({
          title: route.params.name,
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
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />

      <HomeStack.Screen
        name="NameItems"
        component={NameItems}
        options={({ route }) => ({
          title: "Danh mục sản phẩm",
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
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () =>
            authUser.GROUPS === "3" ? (
              <HeaderRightComponet
                navigation={navigation}
                onPress={() => route.params.showModal()}
                name="plus"
                size={sizeFont(5)}
                color="#fff"
                style={styles.touchPlus}
              />
            ) : null,
        })}
      />
      <HomeStack.Screen
        name="NewItem"
        component={NewItem}
        options={({ route }) => ({
          title: "Thêm sản phẩm mới",
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
        })}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  touchPlus: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: sizeFont(4),
    width: sizeFont(8),
    height: sizeFont(8),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: sizeWidth(4),
  },
  viewList: {
    width: sizeWidth(5),
    height: sizeWidth(5),
    backgroundColor: "red",
    color: "#fff",
    borderRadius: sizeWidth(2.5),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: sizeHeight(-1),
    right: sizeWidth(-1),
  },
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
