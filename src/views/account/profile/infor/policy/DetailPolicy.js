import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import IconComponets from "../../../../../components/icon";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../../../../utils/helper/size.helper";
import moment from "moment";
export default class DetailPolicy extends Component {
  componentDidMount() {
    const { navigation, route } = this.props;
    navigation.setParams({
      NAVIGATION: () => {
        navigation.navigate("EditPolicy", {
          item: route.params.item,
        });
      },
    });
  }
  render() {
    const { item } = this.props.route.params;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.view}>
          <Text style={styles.textTitle}>{item.TITLE} </Text>
          <View style={styles.viewChildTime}>
            <IconComponets name="clock" size={sizeFont(4)} color="#999" />
            <Text style={styles.textTime}>
              {moment(item.CREATE_DATE, "H:mm:ss DD/MM/YYYY").format(
                "H:mm:ss DD/MM/YYYY"
              )}{" "}
            </Text>
          </View>
        </View>
        <View style={styles.viewDescription}>
          <Text>{item.DESCRIPTION} </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: sizeWidth(96),
    alignSelf: "center",
    marginTop: sizeHeight(1),
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap:"wrap"
  },
  viewChildTime: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  textTime: {
    color: "#888",
    paddingLeft: sizeWidth(2),
  },
  textTitle: {
    fontSize: sizeFont(4),
    fontWeight: "bold",
  },
  viewDescription: {
    marginTop: sizeHeight(2),
  },
});
