import { Input } from "@/components/Input";
import { View, Image, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from "@/styles/colors";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export default function Home() {

  const [codeCredential, setCodeCredential] = useState("")

  function handleAccesCredential() {
    if (!codeCredential.trim()) {
      return Alert.alert("Credencial", "Informe o codigo da credencial!")
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-green-500 p-8">

      <StatusBar style="light" />

      <Image source={require('@/assets/logo.png')} className="h-16" resizeMode="contain" />
      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons name="ticket-confirmation-outline" size={20} color={colors.green[200]} />
          <Input.Field placeholder="Código do ingresso" onChangeText={setCodeCredential} />
        </Input>

        <Button title="Acessar credencial" onPress={handleAccesCredential} />

        <Link href={"/register"} className="text-gray-100 text-base font-bold text-center mt-8">Ainda não possui ingresso?</Link>
      </View>
    </View>
  )
}