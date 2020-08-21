import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  SectionList,
  StatusBar,
  TextInput,
  Animated,
} from "react-native";
import {
  getListProducts,
  getListSubChildProducts,
} from "../../../service/products";
import { _retrieveData } from "../../../utils/asynStorage";
import { USER_NAME } from "../../../utils/asynStorage/store";
import IconComponets from "../../../components/icon";
import _ from "lodash";
import { Image } from "react-native-elements";
import { ListItem, Left, Body, Icon, Right, Title, Content } from "native-base";

import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import styles from "./style";
import { connect } from "react-redux";
import { handleMoney } from "../../../components/money";
const HEADER_MAX_HEIGHT = sizeWidth(25);
const HEADER_MIN_HEIGHT = 0;
const PROFILE_IMAGE_MAX_HEIGHT = sizeWidth(10);
const PROFILE_IMAGE_MIN_HEIGHT = 40;
var numeral = require("numeral");

class ListProducts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stickyHeaderIndices: [0, 1, 2, 0],
      scrollY: new Animated.Value(0),
    };
    this.count = 0;
}
  componentDidMount() {}
  handleScreen = (text, title, type) => {
    const { navigation } = this.props;
    navigation.navigate(text, { TITLE: title, TYPE: type });
  };

  render() {
    const {
      data,
      refreshing,
      navigation,
      onRefreshing,
      status,
      authUser,
    } = this.props;
    const {
      search,
      see,
      handleSearch,
      loadingSearch,
      onBlurs,
      onFocuss,
      onChange,
      loadingSear,
      deleteSearch,
    } = this.props;
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "extend",
    });
    const proflieImageHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      //extrapolate: "extend",
    });
    const viewHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    });
    console.log("listItem", data);
    return (
      <View>
        <View style={{margin: sizeHeight(1)}} >
            <View style={{height:100,width:'100%'}}>
                <Text style={{height:40,borderRadius:5,backgroundColor:'#222220',color:'white',textAlign:'center',paddingTop:8,fontSize:16}}>
                  Số dư hoa hồng hiện tại
                </Text>
                <View style={{flex: 1, flexDirection: 'row',alignItems:'center'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Image
                        source={require('../../../assets/images/monney.png')}
                        style={{
                          height:40,
                          width:40
                        }}
                      />
                      <Text style={{fontSize:20,color:'#FF5C03',alignItems:'center',fontWeight:'bold',paddingTop:8,paddingLeft:5}}>
                        5.000.000 đ
                      </Text>
                    </View>
                    {/* <View>
                    <Image
                      source={require('../../../assets/images/reload.png')}
                      style={{
                        height:40,
                        width:40
                      }}
                    />
                    </View> */}
                </View>
            </View>
              <IconComponets
                onPress={() => deleteSearch()}
                name="times-circle"
                size={sizeFont(4)}
                color={see == false ? "#fff" : "#888"}
                soild
              />
        </View>
        <View style={{ marginTop: sizeHeight(1) }}>
          <Animated.SectionList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              {
                useNativeDriver: false,
              }
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefreshing}
              />
            }
            sections={data}
            contentContainerStyle={{ paddingBottom: sizeHeight(25) }}
            keyExtractor={(item, index) => {
              return index;
            }}
            renderItem={({ item, section, index }) => {
              if (index == section.INFO.length - 1) {
                this.count = 0;
              }

              return this.count == 5 ? (
                <View
                  style={{
                    borderBottomWidth: 8,
                    borderBottomColor: COLOR.HEADER,
                    paddingLeft: sizeWidth(2.5),
                  }}
                >
                  <FlatList
                    data={section.INFO}
                    horizontal={true}
                    renderItem={({ item, index }) => {
                      this.count = this.count + 1;
                      return (
                        <TouchableOpacity
                          style={styles.touchFlatListChild}
                          onPress={() =>
                            navigation.navigate("DetailProducts", {
                              ID_PRODUCT: item.ID_PRODUCT,
                              NAME: "Home",
                            })
                          }
                        >
                          <View
                            style={{
                              width: "100%",
                              height: sizeHeight(15),
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              source={{ uri: item.IMAGE_COVER }}
                              PlaceholderContent={<ActivityIndicator />}
                              resizeMode="contain"
                              style={styles.imageSize}
                            />
                          </View>
                          <Text style={styles.textName}>
                            {_.truncate(item.PRODUCT_NAME, {
                              length: 16,
                            })}{" "}
                          </Text>
                          <Text style={styles.textCode}>
                            {item.MODEL_PRODUCT}{" "}
                          </Text>
                          <Text style={styles.textPrice}>
                            {numeral(
                              handleMoney(status, item, authUser)
                            ).format("0,0")}
                            VNĐ
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={(item) => item.ID_PRODUCT.toString()}
                  />
                </View>
              ) : null;
            }}
            stickySectionHeadersEnabled={true}
            // renderSectionHeader={({ section: { PARENT_NAME, ID } }) => (
            //   <View style={styles.viewHeader}>
            //     <Text style={styles.title}>{PARENT_NAME} </Text>
            //     <TouchableOpacity
            //       style={styles.touchViewMore}
            //       onPress={() => {
            //         navigation.navigate("ChildListItem", {
            //           name: PARENT_NAME,
            //           ID: ID,
            //         });
            //       }}
            //     >
            //       <Text style={styles.textViewMore}>Xem thêm...</Text>
            //       <IconComponets
            //         size={sizeFont(6)}
            //         color={"#000"}
            //         name="chevron-right"
            //       />
            //     </TouchableOpacity>
            //   </View>
            // )}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProducts);
