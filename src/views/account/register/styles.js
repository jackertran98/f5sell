import { COLOR } from "../../../utils/color/colors";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../utils/helper/size.helper";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  touchRegister: {
    backgroundColor: COLOR.BUTTON_SIGN_IN,
    paddingVertical: sizeHeight(1.5),
    width: sizeWidth(80),
    marginTop: sizeHeight(2),
  },
  textSignin: {
    color: "#fff",
    textAlign: "center",
    fontSize: sizeFont(4),
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontSize: sizeFont(4),
  },
});

export default styles;
