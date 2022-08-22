import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Svg, { Image } from "react-native-svg";
import styles from "./styles";

const AnimatedLoginForm = () => {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <Svg height={height / 2} width={width}>
          <Image
            href={require("../../assets/images/login-background.jpg")}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
          />
        </Svg>
        <View style={styles.closeButtonContainer}>
          <Text>X</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {/* <View style={styles.button}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </View> */}
        <View style={styles.formInputContainer}>
          <TextInput
            placeholderTextColor="black"
            style={styles.textInput}
            placeholder="Email"
          />
          <TextInput
            placeholderTextColor="black"
            style={styles.textInput}
            placeholder="Full Name"
          />
          <TextInput
            placeholderTextColor="black"
            style={styles.textInput}
            placeholder="Password"
          />
          <View style={styles.formButton}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AnimatedLoginForm;
