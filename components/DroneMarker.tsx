import { View, StyleSheet } from 'react-native';
import Animated, { withRepeat, withSequence, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { Package } from 'lucide-react-native';

export default function DroneMarker() {
  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withRepeat(
            withSequence(
              withTiming(1.2, { duration: 1000 }),
              withTiming(1, { duration: 1000 })
            ),
            -1,
            true
          ),
        },
      ],
    };
  });

  const pathStyle = useAnimatedStyle(() => {
    return {
      width: withRepeat(
        withSequence(
          withTiming(100, { duration: 1500 }),
          withTiming(0, { duration: 1500 })
        ),
        -1,
        true
      ),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pulse, pulseStyle]} />
      <View style={styles.marker}>
        <Package size={24} color="#fff" />
      </View>
      <Animated.View style={[styles.path, pathStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  path: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#22c55e',
    opacity: 0.5,
  },
});