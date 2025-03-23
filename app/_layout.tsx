import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { SplashScreen } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

function CustomSplash() {
  return (
    <Animated.View 
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={styles.splash}
    >
      <Animated.Text 
        entering={FadeIn.delay(200).duration(800)}
        style={styles.splashTitle}
      >
        AirDine
      </Animated.Text>
      <Animated.Text 
        entering={FadeIn.delay(500).duration(800)}
        style={styles.splashSubtitle}
      >
        The Future of Food Delivery
      </Animated.Text>
    </Animated.View>
  );
}

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'SpaceGrotesk-Bold': SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        SplashScreen.hideAsync();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      {showSplash ? (
        <CustomSplash />
      ) : (
        <>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splash: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 48,
    color: '#fff',
    marginBottom: 16,
  },
  splashSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#fff',
    opacity: 0.8,
  },
});