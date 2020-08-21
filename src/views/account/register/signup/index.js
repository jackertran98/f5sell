import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import LogoApp from "../../logo";
import ComponentTextInput from "../../../../components/textinput";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../../utils/helper/size.helper";
import { COLOR } from "../../../../utils/color/colors";
import styles from "./style";
import { checkPassword } from "../../../../utils/helper/password_validator";
import { AlertCommon } from "../../../../components/error";
import { regUser } from "../../../../service/auth";
import { result } from "lodash";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneText: "",
      passwordText: "",
      nameText: "",
      confirmPassword: "",
    };
  }
  onBack = () => {
    this.props.navigation.popToTop();
    this.props.navigation.navigate("Home");
  };
  handleReg = () => {
    const { phoneText, passwordText, confirmPassword, nameText } = this.state;
    const password = checkPassword(passwordText);
    console.log(password);
    if (nameText == "") {
      AlertCommon("Thông báo", "Vui lòng nhập họ và tên", () => null);
    } else if (phoneText == "") {
      AlertCommon("Thông báo", "Vui lòng nhập số điện thoại", () => null);
    } else if (password.length != 0) {
      AlertCommon(
        "Mật khẩu yếu",
        "Mật khẩu phải có độ dài lớn hơn 8, bao gồm chữ hoa, chữ thừơng, số và ký tự đặc biệt",
        () => null
      );
    } else {
      if (confirmPassword !== passwordText) {
        AlertCommon(
          "Thống báo",
          "Xác thực mật khẩu không chính xác",
          () => null
        );
      } else {
        regUser({
          FULL_NAME: nameText,
          MOBILE: phoneText,
          EMAIL: "",
          ID_CITY: "",
          ID_DISTRICT: "",
          ADDRESS: "",
          PASSWORD: passwordText,
          IDSHOP: "BABU12",
        })
          .then((result) => {
            console.log("reg", result.data);
            if (result.data.ERROR == "0000") {
              return AlertCommon("Thông báo", result.data.RESULT, this.onBack);
            } else {
              return AlertCommon("Thông báo", result.data.RESULT, () => null);
            }
          })  
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  render() {
    const { phoneText, passwordText, nameText, confirmPassword } = this.state;
    return (
      <ScrollView
        contentContainerStyle={styles.conatainer}
        keyboardShouldPersistTaps="handled"
      >
        {/** <StatusBar barStyle="dark-content" backgroundColor="#FFF" translucent /> */}
        <View style={styles.logo}>
          <LogoApp />
        </View>
        <View>
          <ComponentTextInput
            placeholder="Họ và tên *"
            placeholderTextColor="#999"
            type="name"
            size={sizeFont(6)}
            nameIcon={"user-circle"}
            name={"times-circle"}
            value={nameText}
            onChangeText={(text) => this.setState({ nameText: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ nameText: "" })}
          />
          <ComponentTextInput
            placeholder="Số điện thoại của bạn *"
            placeholderTextColor="#999"
            type="phone"
            size={sizeFont(6)}
            nameIcon={"phone"}
            name={"times-circle"}
            value={phoneText}
            onChangeText={(text) => this.setState({ phoneText: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ phoneText: "" })}
          />
          <ComponentTextInput
            placeholder="Mật khẩu *"
            placeholderTextColor="#999"
            type="password"
            size={sizeFont(6)}
            nameIcon={"lock"}
            name={"times-circle"}
            value={passwordText}
            onChangeText={(text) => this.setState({ passwordText: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ passwordText: "" })}
          />
          <ComponentTextInput
            placeholder="Xác nhận mật khẩu *"
            placeholderTextColor="#999"
            type="password"
            size={sizeFont(6)}
            nameIcon={"lock"}
            name={"times-circle"}
            value={confirmPassword}
            onChangeText={(text) => this.setState({ confirmPassword: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ confirmPassword: "" })}
          />
        </View>
        <View style={styles.viewFooter}>
          <TouchableOpacity style={styles.touchSignUp} onPress={this.handleReg}>
            <Text style={styles.textSignUp}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: sizeHeight(5) }}
            onPress={() => this.props.navigation.navigate("SignIn")}
          >
            <Text style={styles.textFoot}>
              Bạn đã có tài khoản ? Đăng nhập ngay
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom:
              Platform.OS == "ios" ? sizeHeight(25) : sizeHeight(10),
          }}
        />
      </ScrollView>
    );
  }
}
