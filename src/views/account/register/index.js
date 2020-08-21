import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { COLOR } from "../../../utils/color/colors";
import { sizeFont } from "../../../utils/helper/size.helper";

export default class Register extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          Đăng kí để trở thành đại lý bán hàng
        </Text>
        <TouchableOpacity
          style={styles.touchRegister}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.textSignin}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={[
            styles.touchRegister,
            { backgroundColor: COLOR.BUTTON_SIGN_UP },
          ]}
        >
          <Text style={styles.textSignin}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
