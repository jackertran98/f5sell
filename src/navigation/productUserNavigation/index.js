import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import OrderUser from "../../views/orders";
import { COLOR } from "../../utils/color/colors";
import Collaborator from "../../views/orders/collaborator";
import StatusOrder from "../../views/orders/status";
import { HeaderLeftComponet } from "../../components/header";
import { sizeFont } from "../../utils/helper/size.helper";
import ListCountries from "../../views/orders/collaborator/countries";
import LevelCollaborator from "../../views/orders/collaborator/level";
import DetailsOrdered from "../../views/orders/detail";
import StatusBuyer from "../../views/orders/status/StatusBuyer";
import { Text } from "native-base";
import OrderTopNavigation from "../orderTopNavigation";
import { connect } from "react-redux";
import ListStores from "../../views/orders/liststore";
import DetailOrderStore from "../../views/orders/detail/DetailOrderStore";
import LevelCTV from "../../components/levelctv";
import ListNameStore from "../../components/listnamestore";
import ListCTV from "../../components/listctv";

const MyOrderStack = createStackNavigator();

MyProductUserStack = (props) => {
  const { status, navigation, route, authUser, listItem, countNotify } = props;
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  // console.log(route.state);
  return (
    <MyOrderStack.Navigator>
      <MyOrderStack.Screen
        name="OrderUser"
        component={OrderTopNavigation}
        options={({ route }) => ({
          title: "Đơn hàng",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => null,
          headerRight: () => {
            if (authUser.GROUPS === "3") {
              console.log("route 111", route);
              return (
                <TouchableOpacity
                  style={{ marginRight: sizeFont(3) }}
                  onPress={() =>
                    navigation.navigate("OrderStore", {
                      STORE: 0,
                    })
                  }
                >
                  <Text
                    style={{
                      fontSize: sizeFont(4),
                      textDecorationLine: "underline",
                      color: "#fff",
                    }}
                  >
                    Xem kho
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          },
        })}
      />
      <MyOrderStack.Screen
        name="OrderStore"
        component={OrderTopNavigation}
        options={({ route }) => ({
          title: "Đơn hàng kho",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => null,
          headerRight: () => {
            if (authUser.GROUPS === "3") {
              console.log("route 111", route);
              return (
                <TouchableOpacity
                  style={{ marginRight: sizeFont(3) }}
                  onPress={() =>
                    navigation.navigate("OrderUser", {
                      STORE: 1,
                    })
                  }
                >
                  <Text
                    style={{
                      fontSize: sizeFont(4),
                      textDecorationLine: "underline",
                      color: "#fff",
                    }}
                  >
                    Đơn đại lý
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          },
        })}
      />
      <MyOrderStack.Screen
        name="Collaborator"
        component={Collaborator}
        options={{
          title: "Danh sách CTV",
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
              onPress={() => navigation.navigate("OrderUser")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        }}
      />
      <MyOrderStack.Screen
        name="StatusOrder"
        component={StatusOrder}
        options={({ route }) => ({
          title: "Chọn trạng thái",
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
        })}
      />
      <MyOrderStack.Screen
        name="ListCountries"
        component={ListCountries}
        options={{
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
              onPress={() => navigation.navigate("Collaborator")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        }}
      />
      <MyOrderStack.Screen
        name="LevelCollaborator"
        component={LevelCollaborator}
        options={{
          title: "Chọn Cấp Đại Lý",
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
              onPress={() => navigation.navigate("Collaborator")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        }}
      />
      <MyOrderStack.Screen
        name="DetailsOrdered"
        component={DetailsOrdered}
        options={({ route }) => ({
          title: "Chi tiết đơn hàng",
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

      <MyOrderStack.Screen
        name="DetailOrderStore"
        component={DetailOrderStore}
        options={({ route }) => ({
          title: "Chi tiết đơn hàng kho",
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
      <MyOrderStack.Screen
        name="StatusBuyer"
        component={StatusBuyer}
        options={{
          title: "Chọn trạng thái",
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
              onPress={() => navigation.navigate("DetailsOrdered")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        }}
      />

      <MyOrderStack.Screen
        name="ListStores"
        component={ListStores}
        options={({ route }) => ({
          title: "Các kho tiếp nhận",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.BUTTON,
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
      <MyOrderStack.Screen
        name="LevelCTV"
        component={LevelCTV}
        options={({ route }) => ({
          title: "Đại lý",
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
        })}
      />
      <MyOrderStack.Screen
        name="ListNameStore"
        component={ListNameStore}
        options={({ route }) => ({
          title: "Danh sách kho",
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
        })}
      />

      <MyOrderStack.Screen
        name="ListCTV"
        component={ListCTV}
        options={({ route }) => ({
          title: "Danh sách đại lý",
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
        })}
      />
    </MyOrderStack.Navigator>
  );
};

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
)(MyProductUserStack);
