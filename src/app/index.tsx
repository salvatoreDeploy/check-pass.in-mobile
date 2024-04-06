import { Input } from "@/components/Input";
import { Text, View, Image } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-green-500 p-8">
      <Image source={require('@/assets/logo.png')} className="h-16" resizeMode="contain" />
      <View className="w-ful mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons name="ticket-confirmation-outline" size={20} />
          <Input.Field placeholder="Código do ingresso" />
        </Input>
      </View>
    </View>
  )
}