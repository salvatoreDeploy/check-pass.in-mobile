import "../styles/global.css"
import { Slot } from "expo-router"
import { StatusBar } from 'expo-status-bar';

import { useFonts, RobotoCondensed_400Regular, RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed'
import { Loading } from "../components/Loading";

export default function Layout() {

  const [fontsLoaded] = useFonts({ RobotoCondensed_400Regular, RobotoCondensed_700Bold })

  return (
    <>
      <StatusBar style="light" />
      {fontsLoaded ? <Slot /> : <Loading />}
    </>
  )
}