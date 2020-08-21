import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";
import Information from "./infor";
import LogoApp from "./logo";
import { sizeHeight } from "../../utils/helper/size.helper";
import Register from "./register";
import Contact from "./contact";
import { connect } from "react-redux";
import Profile from "./profile";
import { COLOR } from "../../utils/color/colors";

class Account extends Component {
  render() {
    const { status, authUser } = this.props;
    console.log(status);
    return status == "" ? (
      <View style={{ backgroundColor: "#fff", height: sizeHeight(100) }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={COLOR.HEADER}
          //translucent
        />
        <LogoApp />
        <Register navigation={this.props.navigation} />
        <Information navigation={this.props.navigation} />
        <Contact />
      </View>
    ) : (
      <Profile navigation={this.props.navigation} />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { LoginPhone: (data) => dispatch(LoginPhone(data)) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
