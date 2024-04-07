import "../styles/global.css"
import { Slot } from "expo-router"

import { useFonts, RobotoCondensed_400Regular, RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed'
import { Loading } from "../components/Loading";

export default function Layout() {

  const [fontsLoaded] = useFonts({ RobotoCondensed_400Regular, RobotoCondensed_700Bold })

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <Slot />
  )
}