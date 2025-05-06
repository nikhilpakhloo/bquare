import MaskedView from "@react-native-masked-view/masked-view";
import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import BootSplash, { Manifest } from "react-native-bootsplash";
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const MAX_SCALE = 10;

const manifest: Manifest = require("../assets/bootsplash/manifest.json");

const styles = StyleSheet.create({
  mask: {
    backgroundColor: "black",
    borderRadius: manifest.logo.width,
    width: manifest.logo.width,
    height: manifest.logo.height,
  },
  transparent: {
    backgroundColor: "transparent",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  }
});

type Props = {
  animationEnded: boolean;
  children: ReactNode;
  onAnimationEnd: () => void;
};

export const AnimatedBootSplash = ({
  animationEnded,
  children,
  onAnimationEnd,
}: Props) => {
  const [ready, setReady] = useState(false);

  const opacity = useSharedValue(1);
  const scale = useSharedValue(animationEnded ? MAX_SCALE : 1);
  const bgProgress = useSharedValue(0);

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        bgProgress.value,
        [0, 1],
        ['transparent', '#5391B4']
      ),
    };
  });

  const { container, logo } = BootSplash.useHideAnimation({
    manifest,
    ready,

    logo: require("../assets/bootsplash/logo.png"),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      // eslint-disable-next-line react-compiler/react-compiler
      opacity.value = withTiming(0, {
        duration: 250,
        easing: Easing.out(Easing.ease),
      });

      bgProgress.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });

      scale.value = withTiming(
        MAX_SCALE,
        {
          duration: 350,
          easing: Easing.back(0.75),
        },
        () => {
          runOnJS(onAnimationEnd)();
        },
      );
    },
  });

  return (
    <>
      {/* Apply background color under the mask */}
      {!animationEnded && <View style={container.style} />}

      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={
          // Transparent background because mask is based off alpha channel
          <View style={[container.style, styles.transparent]}>
            <Animated.View
              style={[styles.mask, scaleStyle]}
              onLayout={() => {
                setReady(true);
              }}
            />
          </View>
        }
      >
        {children}
      </MaskedView>

      {!animationEnded && (
        // Don't apply background color above the mask
        <View {...container} style={[container.style, styles.transparent]}>
          <Animated.View style={[styles.container, backgroundStyle]} />
          <Animated.Image
            {...logo}
            style={[logo.style, opacityStyle, scaleStyle]}
          />
        </View>
      )}
    </>
  );
};