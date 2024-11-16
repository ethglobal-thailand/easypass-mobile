import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingScreen1 from "@/assets/svg/onboarding-1";
import OnboardingScreen2 from "@/assets/svg/onboarding-2";
import OnboardingScreen3 from "@/assets/svg/onboarding-3";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { storage } from "@/constants";

const NextButton = ({ label, ...props }: any) => (
  <View className="px-8 bg-transparent py-3">
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 12,
      }}
      className="py-4"
      {...props}
    >
      <Text className="text-center text-black font-bold">{label}</Text>
    </TouchableOpacity>
  </View>
);

const OnboardingScreen = () => {
  const [, setIsFırstTime] = useMMKVStorage("is-first-time", storage, true);
  const ref = useRef<Onboarding | null>(null);
  const pageData = [
    {
      image: <OnboardingScreen1 />,
      backgroundColor: "#000",
      title: "Displays a list of visited countries in a clean",
      subtitle: "",
    },
    {
      image: <OnboardingScreen2 />,
      backgroundColor: "#000",
      title: "Scan your passport's MRZ code with your camera",
      subtitle: "",
    },
    {
      image: <OnboardingScreen3 />,
      backgroundColor: "#000",
      title:
        "Ensures user data privacy with secure data storage and processing.",
      subtitle: "",
    },
  ];
  const [pageIndex, setPageIndex] = useState(0);
  return (
    <SafeAreaView className="flex-1 bg-black ">
      <Onboarding
        ref={ref}
        bottomBarColor="black"
        showSkip={false}
        showNext={false}
        showDone={false}
        titleStyles={{ padding: 16, fontSize: 32 }}
        subTitleStyles={false}
        pageIndexCallback={setPageIndex}
        pages={pageData}
      />
      <NextButton
        onPress={() => {
          if (pageIndex === pageData.length - 1) {
            return setIsFırstTime(false);
          }
          ref.current?.goNext();
        }}
        label={pageIndex === pageData.length - 1 ? "Login" : "Next"}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
