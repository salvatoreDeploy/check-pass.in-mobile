import { Header } from "@/components/Header";
import { Credentials } from "@/components/Credentials";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/Button";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker"
import { QrCode } from "@/components/QrCode";
import { useBadgesStore } from "@/store/badge-store";
import { Redirect } from "expo-router";


export default function Ticket() {

  const [uriAvatar, setUriAvatar] = useState("")
  const [expandQRCode, setExpandQRCode] = useState<boolean>(false)

  const badgeStore = useBadgesStore()

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4]
      })

      if (result.assets) {
        setUriAvatar(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Foto", "Não possível selecionar a imagem")
    }

  }

  function handleExpandQRCode() {
    return setExpandQRCode(true)
  }

  function handleCloseQRCode() {
    return setExpandQRCode(false)
  }

  if (!badgeStore.badge?.checkInURL) {
    return <Redirect href="/" />
  }

  return (

    <View className="flex-1 bg-green-500">

      <StatusBar style="light" />

      <Header title="Minha Credencial" />
      <ScrollView className="-mt-28 -z-10" contentContainerClassName="px-8 pb-8" showsVerticalScrollIndicator={false}>
        <Credentials uriAvatar={uriAvatar} onChangeAvatar={handleSelectImage} onShowQRCode={handleExpandQRCode} badge={badgeStore.badge} />

        <FontAwesome name="angle-double-down" size={24} color={colors.gray[300]} className="self-center my-6" />

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que voce vai participar do {badgeStore.badge.eventTitle}
        </Text>

        <Button title="Compartilhar" />

        <TouchableOpacity activeOpacity={0.7} className="mt-10" onPress={() => badgeStore.remove()}>
          <Text className="text-white font-bold text-center">Remover ingresso</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent animationType="slide">
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity activeOpacity={0.7} onPress={handleCloseQRCode}>
            <QrCode value={badgeStore.badge.checkInURL} size={300} />
            <Text className="font-bold text-orange-500 text-sm text-center mt-10">
              Fechar QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>

  )
}