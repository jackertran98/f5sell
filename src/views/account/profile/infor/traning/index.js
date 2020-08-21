import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { GetInformation } from "../../../../../service/account";
import { connect } from "react-redux";
import { ElementCustom } from "../../../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import IconComponets from "../../../../../components/icon";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../../../utils/helper/size.helper";
import _ from "lodash";
class Tranning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }
  componentDidMount() {
    const { authUser } = this.props;
    GetInformation({
      USERNAME: authUser.USERNAME,
      TYPES: 3,
      IDSHOP: "BABU12",
    })
      .then((result) => {
        console.log(result);
        if (result.data.ERROR === "0000") {
          this.setState(
            {
              data: result.data.INFO,
            },
            () => this.setState({ loading: false })
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  }
  Î;
  render() {
    const { loading, data } = this.state;
    return loading ? (
      <Spinner
        visible={loading}
        animation="fade"
        customIndicator={<ElementCustom />}
      />
    ) : (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.ID}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.viewContainer}>
                <IconComponets
                  name="folder-open"
                  size={sizeFont(5)}
                  color="#888"
                  style={{ marginRight: sizeWidth(2) }}
                />
                <Text style={styles.textTitle}>
                  {_.truncate(item.TITLE, {
                    length: 40,
                  })}{" "}
                </Text>
                <IconComponets
                  name="pen"
                  size={sizeFont(5)}
                  color="#888"
                  style={{
                    position: "absolute",
                    right: sizeWidth(2.5),
                  }}
                />
              </View>
            );
          }}
        />
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
const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: sizeHeight(2),
    paddingHorizontal: sizeWidth(2.5),
  },
  textTitle: {
    fontSize: sizeFont(4),
    color: "#000",
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tranning);
