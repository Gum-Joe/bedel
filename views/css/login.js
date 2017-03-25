import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "fontFamily": "Open-Sans-Light"
    },
    "container": {
        "textAlign": "center"
    },
    "container logo": {
        "marginLeft": "auto",
        "marginRight": "auto",
        "paddingTop": 20,
        "paddingBottom": 20,
        "textAlign": "center",
        "borderBottomStyle": "dashed",
        "borderBottomColor": "#34495e"
    },
    "container logo img": {
        "marginLeft": "auto",
        "marginRight": "auto",
        "width": 250
    },
    "container login-box": {
        "marginLeft": "auto",
        "marginRight": "auto",
        "height": 400,
        "width": 300,
        "borderColor": "#bdc3c7",
        "borderWidth": 1,
        "borderRadius": 2,
        "paddingTop": 5,
        "textAlign": "left"
    },
    "container login-box form div": {
        "marginBottom": 13
    },
    "container login-box form div input": {
        "borderRadius": 2
    },
    "container login-box form div button": {
        "borderRadius": 2,
        "marginTop": 13
    },
    "container login-box form div input ::-webkit-input-placeholder": {
        "color": "#7f8c8d",
        "opacity": 1
    },
    "container login-box form div button ::-webkit-input-placeholder": {
        "color": "#7f8c8d",
        "opacity": 1
    },
    "container login-box form div input :-moz-placeholder": {
        "color": "#7f8c8d",
        "opacity": 1
    },
    "container login-box form div button :-moz-placeholder": {
        "color": "#7f8c8d",
        "opacity": 1
    },
    "container login-box form div input ::-moz-placeholder": {
        "color": "#7f8c8d",
        "opacity": 1
    },
    "container login-box form div button ::-moz-placeholder": {
        "color": "#7f8c8d",
        "opacity": 1
    },
    "container login-box form div input :-ms-input-placeholder": {
        "color": "#7f8c8d"
    },
    "container login-box form div button :-ms-input-placeholder": {
        "color": "#7f8c8d"
    },
    "container login-box form div username": {
        "borderBottomLeftRadius": 0,
        "borderBottomRightRadius": 0
    },
    "container login-box form div password": {
        "borderTopLeftRadius": 0,
        "borderTopRightRadius": 0
    },
    "container login-box oauth-box": {
        "textDecoration": "none",
        "color": "black"
    },
    "container login-box oauth-box oauth-box-body": {
        "textAlign": "left",
        "width": 300,
        "height": 55,
        "paddingTop": 9,
        "fontSize": 20
    },
    "container login-box oauth-box oauth-box-body i": {
        "marginRight": 5
    },
    "container login-box oauth-box oauth-box-body fa-chevron-right": {
        "float": "right",
        "marginTop": 7.7
    }
});