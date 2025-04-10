import * as Cabin from '@expo-google-fonts/cabin';
import * as Montserrat from '@expo-google-fonts/montserrat';
import * as Catamaran from '@expo-google-fonts/catamaran';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import '.././global.css';
import { SessionProvider, useSession } from '../contexts/SessionContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isLoading } = useSession();
  const [brandFontsLoaded] = Montserrat.useFonts({
    BrandRegular: Montserrat.Montserrat_400Regular,
    BrandMedium: Montserrat.Montserrat_500Medium,
    BrandSemiBold: Montserrat.Montserrat_600SemiBold,
    BrandBold: Montserrat.Montserrat_700Bold,
  });
  const [headerFontsLoaded] = Cabin.useFonts({
    HeaderRegular: Cabin.Cabin_400Regular,
    HeaderMedium: Cabin.Cabin_500Medium,
    HeaderSemiBold: Cabin.Cabin_600SemiBold,
    HeaderBold: Cabin.Cabin_700Bold,
  });
  const [bodyFontsLoaded] = Catamaran.useFonts({
    BodyThin: Catamaran.Catamaran_100Thin,
    BodyExtraLight: Catamaran.Catamaran_200ExtraLight,
    BodyLight: Catamaran.Catamaran_300Light,
    BodyRegular: Catamaran.Catamaran_400Regular,
    BodyMedium: Catamaran.Catamaran_500Medium,
    BodySemiBold: Catamaran.Catamaran_600SemiBold,
    BodyBold: Catamaran.Catamaran_700Bold,
    BodyExtraBold: Catamaran.Catamaran_800ExtraBold,
    BodyBlack: Catamaran.Catamaran_900Black,
  });

  useEffect(() => {
    if (!isLoading && headerFontsLoaded && brandFontsLoaded && bodyFontsLoaded) {
      // Hide the splash screen once the fonts are loaded and the app is ready
      SplashScreen.hideAsync();
    }
  }, [isLoading, headerFontsLoaded, brandFontsLoaded, bodyFontsLoaded]);

  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* TASK: remove? */}
        <Stack.Screen name='login' />
        <Stack.Screen name='signup' />
      </Stack>
    </SessionProvider>
  );
}
