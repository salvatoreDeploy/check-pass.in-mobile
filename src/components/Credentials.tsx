import { Image, View, ImageBackground, Text, TouchableOpacity } from "react-native";

export function Credentials() {
  return (
    <View className="w-full self-stretch items-center">
      <Image className="w-24 h-52 z-10" source={require("@/assets/ticket/band.png")} />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-4 rounded-2xl -mt-5">
        <ImageBackground className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden" source={require("@/assets/ticket/header.png")}>
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 font-bold text-sm">Nome do Evento</Text>
            <Text className="text-zinc-50 font-bold text-sm">1234567</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        <Image source={{ uri: "https://github.com/salvatoreDeploy.png" }} className="w-36 h-36 rounded-full -mt-24" />

        <Text className="font-bold text-2xl text-zinc-50 mt-4">Henrique José de Araujo</Text>
        <Text className="font-regular text-base text-zinc-300 mb-4">liderhenrique@email.com</Text>

        <Image source={require("@/assets/ticket/qrcode.png")} className="w-32 h-32" />

        <TouchableOpacity activeOpacity={0.7}>
          <Text className="font-bold text-orange-500 text-sm mt-4">Ampliar QRCode</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}