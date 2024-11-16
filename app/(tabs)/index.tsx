import { View, Text, TextInput, Pressable, Platform } from "react-native";
import React, { useRef, useState } from "react";
import MapView, { MapMarker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Feather } from "@expo/vector-icons";

import { captureRef } from "react-native-view-shot";

const MapScreen = () => {
  const [coordinates, setCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);

  const mapRef = useRef<MapView | null>(null);

  const [waiting, setWaiting] = useState(false);

  const handleShare = async () => {
    const uri = await captureRef(mapRef, {
      format: "png",
      quality: 1,
    });
  };

  return (
    <View className="flex-1">
      <View className="flex-1 ">
        <SafeAreaView className="absolute bg-transparent w-full top-0 z-[999] left-0">
          <View className="px-12  py-5">
            <View className="bg-primary rounded-xl w-full h-[56px] items-center flex-row px-2">
              <Feather name="search" color={"white"} size={32} />
              <TextInput
                className="flex-1 h-full px-2 text-white font-bold"
                placeholder="Search for place"
                placeholderTextColor={"white"}
              />
            </View>
          </View>
        </SafeAreaView>
        <MapView
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
          }}
          onPress={(e) => {
            setCoordinates([...coordinates, e.nativeEvent.coordinate]);
          }}
        >
          {coordinates.map((coor) => (
            <MapMarker
              onPress={(e) => {
                setCoordinates(
                  coordinates.filter(
                    (coor) =>
                      coor.latitude !== e.nativeEvent.coordinate.latitude &&
                      coor.longitude !== e.nativeEvent.coordinate.longitude
                  )
                );
              }}
              key={JSON.stringify(coor)}
              coordinate={coor}
            >
              {Platform.OS !== "ios" && (
                <View className="item-center justify-center ">
                  <FontAwesome name="map-marker" color={"#7842ED"} size={32} />
                </View>
              )}
            </MapMarker>
          ))}
        </MapView>
      </View>
      <View className="py-6 px-12 flex-row items-start justify-start gap-x-6 pb-10">
        <View>
          <Text className="text-white text-xl">Total Places</Text>
          <Text className="text-white text-3xl font-bold">189</Text>
        </View>
        <View className="h-full w-[0.2px] bg-white"></View>
        <View>
          <Text className="text-white text-xl">Countries</Text>
          <Text className="text-white text-3xl font-bold">189</Text>
        </View>
        <Pressable
          onPress={() => {}}
          className="bg-white px-4 py-1 rounded-full"
        >
          <Text className="text-black ">More</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MapScreen;
