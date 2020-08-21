import * as React from "react";
import { Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLOR } from "../../utils/color/colors";
import { Badge } from "react-native-elements";

import {
  sizeWidth,
  sizeHeight,
  sizeFont,
} from "../../utils/helper/size.helper";
import OrderUser from "../../views/orders";
import ProcessingOrder from "../../views/orders/orderprocessing";
import DeliveringOrder from "../../views/orders/delivering";
import DeliveredOrder from "../../views/orders/delivered";
import CompletedOrder from "../../views/orders/completed";
import CancelOrder from "../../views/orders/cancel";
import childitem from "../../views/home/childitem";
import navigation from "..";
import WaitAccept from "../../views/orders/waitaccept";
const Tab = createMaterialTopTabNavigator();
const handleCount = (item, route) => {
  if (item.params) {
    if (item.params.notify) {
      // console.log("hello", item);
      const { notify } = item.params;
      if (route.name === "OrderUser") {
        for (let i = 0; i < notify.length; i++) {
          if (notify[i].status === "0" && route.name === "Hoàn thành") {
            return notify[i].count;
          } else if (
            notify[i].status === "1" &&
            route.name === "Đã tiếp nhận"
          ) {
            return notify[i].count;
          } else if (notify[i].status === "2" && route.name === "Đang xử lý") {
            return notify[i].count;
          } else if (notify[i].status === "3" && route.name === "Đang chuyển") {
            return notify[i].count;
          } else if (notify[i].status === "4" && route.name === "Huỷ") {
            return notify[i].count;
          } else if (
            notify[i].status === "7" &&
            route.name === "Đã giao hàng"
          ) {
            return notify[i].count;
          }
        }
      } else {
        for (let i = 0; i < notify.length; i++) {
          if (notify[i].status === "0" && route.name === "Chờ xác nhận") {
            return notify[i].count;
          } else if (
            notify[i].status === "1" &&
            route.name === "Đã tiếp nhận"
          ) {
            return notify[i].count;
          } else if (notify[i].status === "2" && route.name === "Đang xử lý") {
            return notify[i].count;
          } else if (notify[i].status === "3" && route.name === "Đang chuyển") {
            return notify[i].count;
          } else if (notify[i].status === "4" && route.name === "Huỷ") {
            return notify[i].count;
          } else if (
            notify[i].status === "6" &&
            route.name === "Đã giao hàng"
          ) {
            return notify[i].count;
          } else if (
            notify[i].status === "5" &&
            route.name === "Đã hoàn thành"
          ) {
            return notify[i].count;
          }
        }
      }
      return 0;
    }
    return 0;
  }
  return 0;
};

function OrderTopNavigation(props) {
  console.log("[[[[", props);
  const { route, navigation } = props;
  const name = props.route;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => (
          <View
            style={{
              backgroundColor: focused ? COLOR.BUTTON : "#fff",
              alignItems: "center",
              justifyContent: "space-around",
              width: sizeWidth(31),
              borderRadius: 2,
              borderWidth: 1,
              paddingVertical: sizeHeight(1),
              paddingHorizontal: sizeWidth(1.5),
              flexDirection: "row",
              borderColor: focused ? COLOR.BUTTON : "#999",
            }}
          >
            <Text
              style={{
                color: focused ? "#fff" : "#000",
                fontSize: sizeFont(3.5),
              }}
            >
              {route.name}
            </Text>
            <Badge
              status="primary"
              value={handleCount(name, route)}
              textStyle={{
                color: focused ? "#FFF" : "#000",
              }}
              badgeStyle={{
                backgroundColor: focused ? COLOR.BUTTON : "#fff",
                borderColor: focused ? "#fff" : "#000",
              }}
            />
          </View>
        ),
      })}
      tabBarOptions={{
        style: {
          paddingVertical: sizeHeight(1),
        },
        inactiveTintColor: "#000",
        activeTintColor: "red",
        labelStyle: {
          textTransform: "none",
          textAlign: "left",
        },
        tabStyle: {
          width: sizeWidth(33),
        },
        scrollEnabled: true,
        indicatorStyle: {
          backgroundColor: "red",
          width: 0,
        },
      }}
    >
      {route.name !== "OrderUser" ? (
        <Tab.Screen name="Chờ xác nhận">
          {() => <WaitAccept navigation={navigation} name={route.name} />}
        </Tab.Screen>
      ) : null}
      <Tab.Screen name="Đã tiếp nhận">
        {() => <OrderUser navigation={navigation} name={route.name} />}
      </Tab.Screen>
      <Tab.Screen
        name="Đang xử lý"
        // component={ProcessingOrder}
        options={{
          title: "Đang xử lý",
        }}
      >
        {() => <ProcessingOrder navigation={navigation} name={route.name} />}
      </Tab.Screen>
      <Tab.Screen
        name="Đang chuyển"
        //component={DeliveringOrder}
        options={{
          title: "Đang chuyển",
        }}
      >
        {() => <DeliveringOrder navigation={navigation} name={route.name} />}
      </Tab.Screen>
      <Tab.Screen
        name="Đã giao hàng"
        //component={DeliveredOrder}
        options={{
          title: "Đã giao hàng",
        }}
      >
        {() => <DeliveredOrder navigation={navigation} name={route.name} />}
      </Tab.Screen>
      <Tab.Screen
        name="Hoàn thành"
        //component={CompletedOrder}
        options={{
          title: "Hoàn thành",
        }}
      >
        {() => <CompletedOrder navigation={navigation} name={route.name} />}
      </Tab.Screen>
      <Tab.Screen
        name="Huỷ"
        //component={CancelOrder}
        options={{
          title: "Huỷ",
        }}
      >
        {() => <CancelOrder navigation={navigation} name={route.name} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default OrderTopNavigation;
