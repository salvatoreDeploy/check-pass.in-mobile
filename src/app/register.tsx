import { Input } from "@/components/Input";
import { View, Image, Alert } from "react-native";
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { colors } from "@/styles/colors";
import { Button } from "@/components/Button";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { api } from "@/api/axios";
import axios from "axios";
import { useBadgesStore } from "@/store/badge-store";

const EVENT_ID = "clulzhhzc00002v6rz08k7sr0"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const badgeStore = useBadgesStore()

  async function handleRegister() {

    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert("Cadastro", "Nome ou e-mail inválidos, por gentileza preencha todos os campos!")
      }

      setIsLoading(true)

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendde`, {
        name, email
      })

      if (registerResponse.data.attenddeId) {

        const badgeResponse = await api.get(`/attendde/${registerResponse.data.attenddeId}/badge`)

        badgeStore.save(badgeResponse.data.badge)

        Alert.alert("Inscrição", "Inscrição realizada com sucesso", [
          { text: "Confirmado", onPress: () => { router.push('/ticket') } }
        ])
      }

      console.log(registerResponse.data.attenddeId)

    } catch (error) {
      console.log(error)

      if (axios.isAxiosError(error)) {
        if (String(error.response?.data.message).includes("already registered")) {
          return Alert.alert("Inscrição", "Este e-mail ja está cadastrado")
        }
      }

      Alert.alert("Inscrição", "Desculpe não possível realizar o registro no evento")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-green-500 p-8">

      <StatusBar style="light" />

      <Image source={require('@/assets/logo.png')} className="h-16" resizeMode="contain" />
      <View className="w-full mt-12 gap-3">
        <Input>
          <FontAwesome6 name="user-circle" size={20} color={colors.green[200]} />
          <Input.Field placeholder="Nome completo" onChangeText={setName} />
        </Input>

        <Input>
          <MaterialIcons name="alternate-email" size={20} color={colors.green[200]} />
          <Input.Field placeholder="E-mail" keyboardType="email-address" onChangeText={setEmail} />
        </Input>

        <Button title="Realizar inscrição" onPress={handleRegister} isLoading={isLoading} disabled={isLoading} />

        <Link href={"/"} className="text-gray-100 text-base font-bold text-center mt-8">Já possuo ingresso</Link>
      </View>
    </View>
  )
}