import { sizeHeight, sizeWidth } from "../../../utils/helper/size.helper";
import { ifIphoneX } from "react-native-iphone-x-helper";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: sizeHeight(5),
    marginTop: sizeHeight(6),
  },
  image: {
    width: sizeWidth(45),
    height: sizeHeight(15),
    ...ifIphoneX({
      width: sizeWidth(52),
      height: sizeHeight(15),
    }),
  },
});

export default styles;
