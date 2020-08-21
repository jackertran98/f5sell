import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import IconComponets from "../../../../components/icon";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../../../utils/helper/size.helper";
import { COLOR } from "../../../../utils/color/colors";
import Carousel from "react-native-snap-carousel";
import styles from "../style";
import { connect } from "react-redux";
import { isIphoneX } from "react-native-iphone-x-helper";
import { WebView } from "react-native-webview";
import {
  AlertCommon,
  AlertCommonLogin,
  ElementCustom,
} from "../../../../components/error";
import { addToCart } from "../../../../action/orderAction";
import { getDetails } from "../../../../service/products";
import Spinner from "react-native-loading-spinner-overlay";
import HTML from "react-native-render-html";
import { handleMoney } from "../../../../components/money";
import FooterAdmin from "../footeradmin";
import _ from "lodash";
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";
var numeral = require("numeral");
const tags = _.without(
  IGNORED_TAGS,
  "table",
  "caption",
  "col",
  "colgroup",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr"
);

const tableDefaultStyle = {
  flex: 1,
  justifyContent: "flex-start",
};

const tableColumnStyle = {
  ...tableDefaultStyle,
  flexDirection: "column",
  alignItems: "center",
};

const tableRowStyle = {
  ...tableDefaultStyle,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 0.3,
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
};

const tdStyle = {
  ...tableDefaultStyle,
  borderRightWidth: 0.5,
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
};

const thStyle = {
  ...tdStyle,
  //backgroundColor: "#CCCCCC",
  alignItems: "center",
};

const renderers = {
  table: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  col: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  colgroup: (x, c) => <View style={tableRowStyle}>{c}</View>,
  tbody: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  tfoot: (x, c) => <View style={tableRowStyle}>{c}</View>,
  th: (x, c) => <View style={thStyle}>{c}</View>,
  thead: (x, c) => <View style={tableRowStyle}>{c}</View>,
  caption: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  tr: (x, c) => <View style={tableRowStyle}>{c}</View>,
  td: (x, c) => <View style={tdStyle}>{c}</View>,
};
class DetailProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      activeTab: 1,
      cartLength: this.props.listItem.length,
      loading: true,
      refreshing: false,
      data: [],
    };
    this.arrayImage = [];
    this.refs._carousel;
    //this.activeTab = 1;
  }
  countPlus = () => {
    this.setState({ count: this.state.count + 1 });
  };
  countNagative = () => {
    if (this.state.count == 1) {
      return;
    } else this.setState({ count: this.state.count - 1 });
  };
  componentDidMount() {
    const { authUser, navigation, status } = this.props;
    //ID_PRODUCT
    const { ID_PRODUCT } = this.props.route.params;
    getDetails({
      USERNAME: status === "" ? null : authUser.USERNAME,
      IDSHOP: "BABU12",
      IDPRODUCT: ID_PRODUCT,
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState({ data: result.data.INFO[0] }, () =>
            this.setState({ loading: false })
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });

    navigation.setParams({
      NAVIGATE: () => null,
    });
  }
  handleTouchBuy = () => {
    const { status, navigation, authUser } = this.props;
    const { count, activeTab, cartLength, loading, data } = this.state;
    if (status == "") {
      return AlertCommonLogin(
        "Thông báo",
        "Vui lòng đăng nhập trước khi đặt hàng",
        () => null,
        () => {
          navigation.popToTop();
          navigation.navigate("account");
        },
        "Huỷ bỏ",
        "Đăng nhập"
      );
    } else {
      data.COUNT = this.state.count;
      this.props.navigation.navigate("DetailAddressCart", {
        NAME: "DetailProducts",
        item: [data],
        SUM:
          parseInt(handleMoney(status, data, authUser)) *
          parseInt(this.state.count),
      });
    }
  };
  handleTouchAdd = async () => {
    const { count, activeTab, cartLength, loading, data } = this.state;
    console.log(cartLength, this.props.listItem.length);
    const { status, navigation } = this.props;
    if (status == "") {
      return AlertCommonLogin(
        "Thông báo",
        "Vui lòng đăng nhập trước khi đặt hàng",
        () => null,
        () => {
          navigation.popToTop();
          navigation.navigate("account");
        },
        "Huỷ bỏ",
        "Đăng nhập"
      );
    }
    await this.props.addToCart(data);
    if (cartLength == this.props.listItem.length) {
      AlertCommon("Thông báo", "Sản phẩm đã có trong giỏ hàng", () => null);
    } else {
      AlertCommon(
        "Thông báo",
        "Thêm sản phẩm vào giỏ hàng thành công",
        () => null
      );
      this.setState({
        cartLength: cartLength + 1,
      });
    }
  };
  render() {
    const { count, activeTab, cartLength, loading, data } = this.state;
    const { status, authUser } = this.props;
    console.log(data);
    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
        // overlayColor="#ddd"
      />
    ) : (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView>
          <SliderBox
            images={data.IMG}
            dotColor={COLOR.BUTTON}
            resizeMode="contain"
            inactiveDotColor={COLOR.HEADER}
            // ImageComponent={({ source }) => {
            //   console.log(source, "10");
            //   return (
            //     <Image
            //       source={{ uri: source.uri }}
            //       style={{ height: sizeHeight(20), width: sizeWidth(100) }}
            //     />
            //   );
            // }}
            // sliderBoxHeight={sizeHeight(25)}
            ImageComponentStyle={{
              height: sizeHeight(25),
            }}
          />
          <View style={{ marginTop: sizeHeight(3) }}>
            <Text
              style={{
                fontSize: sizeFont(4),
                marginLeft: sizeWidth(2),
                paddingBottom: sizeHeight(1),
              }}
            >
              {data.PRODUCT_NAME}
            </Text>
            <View style={styles.viewChildDetail}>
              <Text style={{ fontSize: sizeFont(4), fontWeight: "bold" }}>
                {data.MODEL_PRODUCT}{" "}
              </Text>
            </View>
            <View style={styles.viewChildDetail}>
              <Text style={{ fontSize: sizeFont(4), color: COLOR.BUTTON }}>
                {numeral(handleMoney(status, data, authUser)).format("0,0")} VNĐ
              </Text>
            </View>

            <View style={styles.viewTab}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ activeTab: 1 });
                }}
                style={{
                  backgroundColor: activeTab == 1 ? COLOR.HEADER : "#fff",
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: sizeHeight(1.5),
                }}
              >
                <IconComponets
                  name="file-alt"
                  size={sizeFont(6)}
                  color={activeTab == 1 ? "#fff" : "#888"}
                />
                <Text
                  style={{
                    color: activeTab == 1 ? "#fff" : "#888",
                    marginLeft: sizeWidth(3),
                  }}
                >
                  Thông tin sản phẩm
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ activeTab: 2 });
                }}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: sizeHeight(1.5),
                  backgroundColor: activeTab == 2 ? COLOR.HEADER : "#fff",
                }}
              >
                <IconComponets
                  name="file-alt"
                  size={sizeFont(6)}
                  color={activeTab == 2 ? "#fff" : "#888"}
                />
                <Text
                  style={{
                    color: activeTab == 2 ? "#fff" : "#888",
                    marginLeft: sizeWidth(3),
                  }}
                >
                  Hướng dẫn mua hàng
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: sizeHeight(3) }}>
              {activeTab == 1 ? (
                <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
                  <HTML
                    ignoredTags={tags}
                    html={
                      data.CONTENT_WEB === null
                        ? "<h1>Không có dữ liệu</h1>"
                        : data.CONTENT_WEB
                    }
                    onLinkPress={(event, href) =>
                      console.log("clicked link: ", href)
                    }
                    renderers={renderers}
                    baseFontStyle={{ fontSize: sizeFont(4) }}
                  />
                </View>
              ) : (
                <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
                  <HTML
                    ignoredTags={tags}
                    renderers={renderers}
                    html={
                      data.TRAINING === null
                        ? "<h1>Không có dữ liệu</h1>"
                        : data.TRAINING
                    }
                    baseFontStyle={{ fontSize: sizeFont(4) }}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        {status === "" || (status !== "" && authUser.GROUPS !== "3") ? (
          <SafeAreaView
            style={{
              flexDirection: "row",
              height: isIphoneX() ? sizeHeight(10) : sizeHeight(8),
            }}
          >
            <TouchableOpacity
              onPress={this.handleTouchAdd}
              style={styles.touchSafeAddCart}
            >
              <IconComponets name="cart-plus" size={sizeFont(6)} color="#fff" />
              <Text style={{ color: "#fff", marginLeft: sizeFont(4) }}>
                Thêm vào giỏ hàng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.handleTouchBuy}
              style={styles.touchSafeBuy}
            >
              <Text style={{ color: "#fff" }}>Mua ngay</Text>
            </TouchableOpacity>
          </SafeAreaView>
        ) : (
          <FooterAdmin item={data} />
        )}
      </View>
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
  return { addToCart: (text) => dispatch(addToCart(text)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailProducts);
