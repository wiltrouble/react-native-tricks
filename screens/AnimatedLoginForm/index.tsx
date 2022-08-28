import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import styles from "./styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { transform } from "@babel/core";

const AnimatedLoginForm = () => {
  const { width, height } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);

  const [isRegistering, setisRegistering] = useState(false)

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}]
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation  = interpolate(imagePosition.value, [0,1], [180,360])
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {duration: 800}),
      transform: [{rotate: withTiming(interpolation + "deg", {duration: 1000})}]
    }
  })

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1, {duration: 800})) : withTiming(0, { duration: 300})
    }
  })

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      setisRegistering(false)
    }
  };

  const registerHandle = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      setisRegistering(true)
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id="clickPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          <Image
            href={require("../../assets/images/login-background.jpg")}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clickPathId)"
          />
        </Svg>

        <Animated.View style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
          <Text onPress={() => imagePosition.value = 1}>X</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandle}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholderTextColor="black"
            style={styles.textInput}
            placeholder="Email"
          />
          { isRegistering && 
          <TextInput
            placeholderTextColor="black"
            style={styles.textInput}
            placeholder="Full Name"
          /> }
          <TextInput
            placeholderTextColor="black"
            style={styles.textInput}
            placeholder="Password"
          />
          <View style={styles.formButton}>
            <Text style={styles.buttonText}>{isRegistering ? 'REGISTER' : 'LOG IN'}</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default AnimatedLoginForm;
