import { colors } from "@/styles/colors"
import QRCodeSVG from "react-native-qrcode-svg"

type QrCodeProps = {
  value: string
  size: number
}

export function QrCode({ value, size }: QrCodeProps) {
  return (
    <QRCodeSVG value={value} size={size} color={colors.white} backgroundColor="transparent" />
  )
}