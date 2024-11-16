import { Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const [waiting, setWaiting] = useState(false);
  const [data, setData] = useState<Record<string, any> | null>(null);

  const [uri, setUri] = useState<string | null>(null);

  const cameraRef = useRef<CameraView | null>(null);

  const sendToServer = async (file: any) => {
    console.log(process.env.EXPO_PUBLIC_MRZ_URL);
    try {
      const res = await axios.post(
        "https://easypass.world" + "/scan-image",
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status !== 200) {
        console.log("error", res);
      }
      console.log(res.data);
      const json = res.data;
      setData(json);
      return json;
    } catch (err) {
      console.log(err);
    } finally {
      setWaiting(false);
    }
  };

  const interValRef = useRef<any>(null);
  useEffect(() => {
    if (interValRef.current) {
      return;
    }
    interValRef.current = setInterval(async () => {
      if (waiting) {
        return;
      }
      const imageObj = await cameraRef.current?.takePictureAsync({
        shutterSound: false,
        base64: true,
        quality: 0.2,
      });

      setUri(imageObj?.uri!);

      const fD = new FormData();
      // @ts-ignore
      fD.append("photo", {
        uri:
          Platform.OS === "android"
            ? imageObj?.uri
            : imageObj?.uri.replace("file://", ""),
        type: "image/jpeg",
        name: "image.jpg",
      });
      await sendToServer(fD);
    }, 3000);
    return () => {
      if (interValRef.current) {
        clearInterval(interValRef.current);
      }
    };
  }, [waiting]);

  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white font-bold">Give Permission for camera</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 overflow-hidden pb-12 items-center pt-6">
      <SafeAreaView>
        <View className="rounded-xl overflow-hidden w-[80%] aspect-square">
          <CameraView
            ref={cameraRef}
            animateShutter={false}
            barcodeScannerSettings={{
              barcodeTypes: ["code128"],
            }}
            onBarcodeScanned={(s) => {
              console.log(s);
            }}
            facing="back"
            style={{
              flex: 1,
            }}
          />
        </View>
        <Text className="text-white mt-5 font-bold text-center">
          Scan Your Passport
        </Text>
        <Image className="w-full aspect-square" source={{ uri: uri! }} />
      </SafeAreaView>
    </View>
  );
}
