import { Image, View, ImageBackground, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons"
import { colors } from "@/styles/colors";
import { QrCode } from "./QrCode";
import { BadgesStore } from "@/store/badge-store";
import { MotiView } from "moti";

type CredentialsProps = {
  badge: BadgesStore
  onChangeAvatar: () => void
  onShowQRCode: () => void
}

export function Credentials({ onChangeAvatar, onShowQRCode, badge }: CredentialsProps) {

  const { height } = useWindowDimensions()

  return (
    <MotiView
      from={{ opacity: 0, translateY: -height, rotateZ: "50deg", rotateY: "30deg", rotateX: "30deg" }}
      animate={{ opacity: 1, translateY: 0, rotateZ: "0deg", rotateY: "0deg", rotateX: "00deg" }}
      transition={{ type: "spring", damping: 20, rotateZ: { damping: 15, mass: 3 } }}
      className="w-full self-stretch items-center">
      <Image className="w-24 h-52 z-10" source={require("@/assets/ticket/band.png")} />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-4 rounded-2xl -mt-5">
        <ImageBackground className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden" source={require("@/assets/ticket/header.png")}>
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 font-bold text-sm">{badge.eventTitle}</Text>
            <Text className="text-zinc-50 font-bold text-sm">#{badge.id}</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {
          badge.image ? (
            <TouchableOpacity activeOpacity={0.9} onPress={onChangeAvatar}>
              <Image source={{ uri: badge.image }} className="w-36 h-36 rounded-full -mt-24" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.9} className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center" onPress={onChangeAvatar}>
              <Feather name="camera" color={colors.green[400]} size={32} />
            </TouchableOpacity>
          )
        }

        <Text className="font-bold text-2xl text-zinc-50 mt-4">{badge.name}</Text>
        <Text className="font-regular text-base text-zinc-300 mb-4">{badge.email}</Text>

        <QrCode value={badge.checkInURL} size={120} />

        <TouchableOpacity activeOpacity={0.7} onPress={onShowQRCode}>
          <Text className="font-bold text-orange-500 text-sm mt-4">Ampliar QRCode</Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  )
}