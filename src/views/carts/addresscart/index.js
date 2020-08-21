import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { Provider } from "react-native-paper";
import { Avatar, CheckBox } from "react-native-elements";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import styles from "./style";
import { FormTextInput } from "../../../components/textinput";
import AlertDesignNotification from "../../../components/alert/AlertDesignNotification";
import IconComponets from "../../../components/icon";
import { orderProduct } from "../../../service/order";
import { AlertCommon } from "../../../components/error";
import Loading from "../../../components/loading";
import { handleMoney } from "../../../components/money";
import { removeToCart, removeAllToCart } from "../../../action/orderAction";

var numeral = require("numeral");
class DetailAddressCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneText: this.props.authUser.MOBILE,
      userName: this.props.authUser.FULL_NAME,
      idStore: "",
      levelStore: "",
      city:
        this.props.authUser.CITY == null
          ? ""
          : {
              NAME: this.props.authUser.CITY,
              MATP: this.props.authUser.CITY_ID,
            },
      district:
        this.props.authUser.DISTRICT == null
          ? ""
          : {
              NAME: this.props.authUser.DISTRICT,
              MAQH: this.props.authUser.DISTRICT_ID,
            },
      districChild:
        this.props.authUser.WARD == null
          ? ""
          : {
              NAME: this.props.authUser.WARD,
              XAID: this.props.authUser.WARD_ID,
            },
      address: this.props.authUser.ADDRESS,
      passport: "",
      account: "",
      nameAccount: "",
      nameBank: "",
      showAlert: false,
      checked: true,
      note: "",
      SUM: this.props.route.params.SUM,
      message: "",
      loading: false,
    };
    this.message = "";
  }
  changeCity = (text) => {
    if (text == "- tất cả -") {
      this.setState({ city: "", district: "", districChild: "" });
    } else {
      this.setState({ city: text, district: "", districChild: "" }, () => {
        console.log(this.state.district, "2020202020202020");
      });
    }
  };
  changeDistrict = (text) => {
    if (text == "- tất cả -") {
      this.setState({ district: "", districChild: "" });
    } else this.setState({ district: text, districChild: "" });
  };
  changeDistrictChild = (text) => {
    if (text == "- tất cả -") {
      this.setState({ districChild: "" });
    } else this.setState({ districChild: text });
  };
  handleImage = () => {
    ImagePicker.showImagePicker(options, async (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          loading: true,
        });
      }
    });
  };
  handleNumber = (item) => {
    const { status, authUser } = this.props;
    console.log("oooo", item);
    var resutl = {
      AMOUNT: "",
      PRICE: "",
      CODE_PRODUCT: "",
      MONEY: "",
      BONUS: "",
      ID_PRODUCT_PROPERTIES: "",
    };
    for (let i = 0; i < item.length; i++) {
      resutl.AMOUNT = resutl.AMOUNT + item[i].COUNT + "#";
      resutl.CODE_PRODUCT = resutl.CODE_PRODUCT + item[i].CODE_PRODUCT + "#";
      resutl.PRICE = resutl.PRICE + item[i].PRICE + "#";
      resutl.MONEY =
        resutl.MONEY +
        handleMoney(status, item[i], authUser) * parseInt(item[i].COUNT) +
        "#";
      resutl.BONUS = resutl.BONUS + item[i].PRICE_PROMOTION + "#";
      resutl.ID_PRODUCT_PROPERTIES =
        resutl.ID_PRODUCT_PROPERTIES + item[i].ID_PRODUCT_PROPERTIES + "#";
      console.log("item[i]", resutl);
    }
    console.log("result", resutl);
    resutl.BONUS = resutl.BONUS.substring(0, resutl.BONUS.length - 1);
    resutl.AMOUNT = resutl.AMOUNT.substring(0, resutl.AMOUNT.length - 1);
    resutl.CODE_PRODUCT = resutl.CODE_PRODUCT.substring(
      0,
      resutl.CODE_PRODUCT.length - 1
    );
    resutl.MONEY = resutl.MONEY.substring(0, resutl.MONEY.length - 1);
    resutl.PRICE = resutl.PRICE.substring(0, resutl.PRICE.length - 1);
    resutl.ID_PRODUCT_PROPERTIES = resutl.ID_PRODUCT_PROPERTIES.substring(
      0,
      resutl.ID_PRODUCT_PROPERTIES.length - 1
    );

    return resutl;
  };
  handleBook = () => {
    const {
      phoneText,
      userName,
      city,
      district,
      districChild,
      address,
      note,
      showAlert,
      SUM,
      checked,
    } = this.state;
    const { listItem, authUser } = this.props;
    const { item } = this.props.route.params;

    this.setState(
      {
        loading: true,
        message: "",
      },
      async () => {
        var result;
        if (item == undefined) {
          result = await this.handleNumber(listItem);
        } else {
          result = await this.handleNumber(item);
        }

        console.log("city", result);
        orderProduct({
          USERNAME: authUser.USERNAME,
          CODE_PRODUCT: result.CODE_PRODUCT,
          AMOUNT: result.AMOUNT,
          PRICE: result.PRICE,
          MONEY: result.MONEY,
          BONUS: result.BONUS,
          FULL_NAME: userName,
          MOBILE_RECEIVER: phoneText,
          ID_CITY: city.MATP,
          ID_DISTRICT: district.MAQH,
          ADDRESS: address,
          IDSHOP: "BABU12",
          DISTCOUNT: "",
          NOTE: note,
          ID_PRODUCT_PROPERTIES: "",
          ID_WARD: districChild.XAID,
          ISSETUP: checked ? 1 : 0,
        })
          .then((result) => {
            console.log("order", result);
            if (result.data.ERROR == "0000") {
              this.setState(
                {
                  loading: false,
                  message: result.data.RESULT,
                },
                () => {
                  this.props.removeAllToCart();
                  return AlertCommon("Thông báo", "Đặt hàng thành công", () =>
                    this.props.navigation.navigate("Home")
                  );
                }
              );
            } else {
              this.setState(
                {
                  loading: false,
                  message: result.data.RESULT,
                },
                () => {
                  return AlertCommon("Thông báo", "Đặt hàng thất bại", () =>
                    this.props.navigation.navigate("Home")
                  );
                }
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };
  checkError = () => {
    const {
      phoneText,
      userName,
      city,
      district,
      districChild,
      address,
      note,
      showAlert,
      SUM,
    } = this.state;
    if (
      phoneText == "" ||
      userName == "" ||
      city == "" ||
      district == "" ||
      districChild == "" ||
      address == ""
    ) {
      return false;
    }
    return true;
  };
  handleFeeShip = (item) => {
    var feeShip = 0;
    for (let i = 0; i < item.length; i++) {
      feeShip += parseFloat(item[i].COST_SHIP);
    }
    return feeShip;
  };
  handleFeeSetUp = (item) => {
    var feeSetUp = 0;
    for (let i = 0; i < item.length; i++) {
      feeSetUp += parseFloat(item[i].COST_SETUP);
    }
    return feeSetUp;
  };
  handleTotlaMoney = (item) => {
    var sumMoney = 0;
    if (this.state.checked) {
      for (let i = 0; i < item.length; i++) {
        sumMoney +=
          parseFloat(item[i].COST_SHIP) + parseFloat(item[i].COST_SETUP);
      }
    } else {
      for (let i = 0; i < item.length; i++) {
        sumMoney += parseFloat(item[i].COST_SHIP);
      }
    }
    return numeral(parseFloat(this.state.SUM) + parseFloat(sumMoney)).format(
      "0,0"
    );
  };
  render() {
    const {
      phoneText,
      userName,
      city,
      district,
      districChild,
      address,
      note,
      showAlert,
      SUM,
    } = this.state;
    const { listItem } = this.props;
    const { item } = this.props.route.params;
    console.log("item", item);
    console.log("93939393", listItem, item);
    //console.log(districChild, city, district, "20202020", this.props);
    return (
      <Provider>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            backgroundColor: "#fff",
            paddingBottom: sizeHeight(10),
          }}
        >
          <View style={styles.infor}>
            <Text style={styles.textInfor}>Thông tin khách hàng</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <FormTextInput
              props={{
                placeholder: "Họ và tên *",
                placeholderTextColor: "#Fafafa",
                type: "name",
                size: sizeFont(6),
                name: "times-circle",
                value: userName,
                onChangeText: (text) => this.setState({ userName: text }),
                primary: "#017DFF",
                color: COLOR.COLOR_ICON,
                onDelete: () => this.setState({ userName: "" }),
                style: styles.styleWidth,
              }}
              eye={false}
              onSetSee={this.onSetSee}
              styleTextInput={{
                width: sizeWidth(78),
              }}
              styleChild={styles.styleChild}
            />

            <FormTextInput
              props={{
                placeholder: "Số điện thoại *",
                placeholderTextColor: "#999",
                type: "phone",
                size: sizeFont(6),
                name: "times-circle",
                value: phoneText,
                onChangeText: (text) => this.setState({ phoneText: text }),
                primary: "#017DFF",
                color: COLOR.COLOR_ICON,
                onDelete: () => this.setState({ phoneText: "" }),
                style: styles.styleWidth,
              }}
              eye={false}
              onSetSee={this.onSetSee}
              styleTextInput={{
                width: sizeWidth(78),
              }}
              styleChild={styles.styleChild}
            />

            <View style={{ alignSelf: "center", marginTop: sizeHeight(1) }}>
              <FormTextInput
                props={{
                  placeholder: "Tỉnh/Thành phố *",
                  placeholderTextColor: "#999",
                  type: "email",
                  size: sizeFont(8),
                  name: "chevron-down",
                  value: city.NAME == undefined ? "" : city.NAME,
                  onChangeText: (text) => null,
                  primary: "#017DFF",
                  color: COLOR.BUTTON,
                  onDelete: () => null,
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(76),
                }}
                styleChild={styles.styleChild}
                pointerEvents="none"
                onPressCustom={() => {
                  this.props.navigation.navigate("ListCountries", {
                    onSetCity: this.changeCity,
                    NAME: "DetailAddressCart",
                  });
                }}
                changeColor={COLOR.BUTTON}
                light
              />
              <FormTextInput
                props={{
                  placeholder: "Quận/Huyện *",
                  placeholderTextColor: "#999",
                  type: "email",
                  size: sizeFont(6),
                  name: "chevron-down",
                  value: district.NAME == undefined ? "" : district.NAME,
                  onChangeText: (text) => null,
                  primary: "#017DFF",
                  color: COLOR.BUTTON,
                  onDelete: () => null,
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(76),
                }}
                styleChild={styles.styleChild}
                pointerEvents="none"
                onPressCustom={() => {
                  if (city == "") {
                    this.message = "Vui lòng chọn Tỉnh/Thành phố";
                    this.setState({ showAlert: true });
                  } else {
                    this.props.navigation.navigate("ListDistrict", {
                      onSetDistrict: this.changeDistrict,
                      GHN_TINHID: city.MATP,
                      NAME: "DetailAddressCart",
                    });
                  }
                }}
                changeColor={COLOR.BUTTON}
                light
              />
              <FormTextInput
                props={{
                  placeholder: "Phường/Xã *",
                  placeholderTextColor: "#999",
                  type: "email",
                  size: sizeFont(6),
                  name: "chevron-down",
                  value:
                    districChild.NAME == undefined ? "" : districChild.NAME,
                  onChangeText: (text) => null,
                  primary: "#017DFF",
                  color: COLOR.BUTTON,
                  onDelete: () => null,
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(76),
                }}
                styleChild={styles.styleChild}
                pointerEvents="none"
                onPressCustom={() => {
                  if (city == "") {
                    this.setState({ showAlert: true });
                  } else if (district == "") {
                    this.message = "Vui lòng chọn Quận/Huyện";
                    this.setState({ showAlert: true });
                  } else {
                    console.log("dis", district);
                    this.props.navigation.navigate("ListDistrictChild", {
                      onSetDistrictChild: this.changeDistrictChild,
                      GHN_TINHID: district.MAQH,
                      NAME: "DetailAddressCart",
                    });
                  }
                }}
                changeColor={COLOR.BUTTON}
                light
              />
              <FormTextInput
                props={{
                  placeholder: "Địa chỉ giao hàng *",
                  placeholderTextColor: "#999",
                  type: "email",
                  size: sizeFont(6),
                  name: "times-circle",
                  value: address,
                  onChangeText: (text) => this.setState({ address: text }),
                  primary: "#017DFF",
                  color: COLOR.BUTTON,
                  onDelete: () => this.setState({ address: "" }),
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(78),
                }}
                styleChild={styles.styleChild}
              />
            </View>
            <View style={styles.viewNote}>
              <Text>Ghi chú</Text>
              <TextInput
                //numberOfLines={5}
                multiline={true}
                value={note}
                onChangeText={(text) => this.setState({ note: text })}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                containerStyle={{
                  backgroundColor: "#fff",
                  borderWidth: 0,
                  paddingHorizontal: sizeWidth(0),
                }}
                textStyle={{
                  fontSize: sizeFont(4),
                  fontWeight: "normal",
                  color: "#000",
                }}
                title="Có lắp đặt"
                checked={this.state.checked}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor={COLOR.BUTTON}
                size={sizeFont(8)}
                uncheckedColor={COLOR.BUTTON}
                onPress={() => this.setState({ checked: !this.state.checked })}
              />
              <CheckBox
                containerStyle={{
                  backgroundColor: "#fff",
                  borderWidth: 0,
                  flex: 1,
                }}
                textStyle={{
                  fontSize: sizeFont(4),
                  fontWeight: "normal",
                  color: "#000",
                }}
                title="Không lắp đặt"
                checked={!this.state.checked}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                uncheckedColor={COLOR.BUTTON}
                checkedColor={COLOR.BUTTON}
                size={sizeFont(8)}
                onPress={() => this.setState({ checked: !this.state.checked })}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: sizeHeight(2),
              borderTopWidth: 4,
              borderTopColor: "#DDD",
            }}
          >
            <View
              style={[
                styles.viewMoney,
                {
                  marginTop: sizeHeight(1),
                },
              ]}
            >
              <Text style={styles.textTitle}>Tiền hàng:</Text>
              <Text style={styles.textMoney}>
                {" "}
                {numeral(SUM).format("0,0")}
                VNĐ
              </Text>
            </View>
            <View style={styles.viewMoney}>
              <Text style={styles.textTitle}>Phí vận chuyển:</Text>
              <Text style={styles.textMoney}>
                {this.handleFeeShip(listItem)} VNĐ
              </Text>
            </View>
            <View style={styles.viewMoney}>
              <Text style={styles.textTitle}>Phí lắp đặt:</Text>
              <Text style={styles.textMoney}>
                {this.state.checked ? this.handleFeeSetUp(listItem) : 0} VNĐ
              </Text>
            </View>
            <View style={styles.viewMoney}>
              <Text style={styles.textTitle}>Tổng tiền:</Text>
              <Text
                style={[
                  styles.textMoney,
                  {
                    fontWeight: "bold",
                    color: COLOR.BUTTON,
                  },
                ]}
              >
                {this.handleTotlaMoney(listItem)} VNĐ
              </Text>
            </View>

            <View style={{ alignSelf: "center", marginTop: sizeHeight(1) }}>
              <TouchableOpacity
                disabled={this.checkError() == false ? true : false}
                style={[
                  styles.touchOrder,
                  {
                    backgroundColor:
                      this.checkError() == false ? "#999" : COLOR.BUTTON,
                  },
                ]}
                onPress={this.handleBook}
              >
                <Text style={{ color: "#FFF", textAlign: "center" }}>
                  ĐẶT HÀNG
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.loading ? (
            <View style={{ alignSelf: "center" }}>
              <Loading />
            </View>
          ) : null}
        </ScrollView>
      </Provider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    listItem: state.order.listItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { removeAllToCart: (text) => dispatch(removeAllToCart()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailAddressCart);
