import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LogoSVG from "@/assets/svg/logo";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/single-factor-auth";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { storage } from "@/constants";

global.Buffer = require("buffer").Buffer;

const clientId =
  "BDAMNtcSVMQD3_nZVaPdu48N_iJPElhCvMzFS2LaYTYq8eodXSlwUq1QuvzcePxECwe6wxpHAJNJWKxoAAj-3B0";

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: {
      chainId: "0x2", // Please use 0x1 for Mainnet
      rpcTarget: "https://rpc.ankr.com/eth",
      displayName: "Ethereum Mainnet",
      blockExplorerUrl: "https://etherscan.io/",
      chainNamespace: "eip155",
      ticker: "ETH",
      tickerName: "Ethereum",
      logo: "https://images.toruswallet.io/eth.svg",
    },
  },
});

const web3auth = new Web3Auth({
  clientId, // Get your Client ID from Web3Auth Dashboard
  web3AuthNetwork: "sapphire_devnet",

  privateKeyProvider,
});

const resolvedRedirectUrl = Linking.createURL("myapp", {});

const AuthScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [provider, setProvider] = useState<any>(null);
  const [console, setConsole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    const init = async () => {
      // IMP START - SDK Initialization
      await web3auth.init();
    };
    init();
  }, []);

  const [user, setUser] = useMMKVStorage("user", storage, { token: "" });

  return (
    <SafeAreaView className="bg-dark flex-1">
      <StatusBar style="dark" />
      <View className="bg-dark flex-1 px-12 justify-center items-center">
        <LogoSVG />
        <Text className="text-white">Say Goodbye to Passport Clutter</Text>
        <TouchableOpacity
          onPress={async () => {
            await web3auth.connect({
              verifier: "passowordless",
              verifierId: "easypass-verifier",
              idToken: "cawcwa",
            });
          }}
          className="bg-primary px-3 w-full mt-6 py-4 rounded-lg"
        >
          <Text className="text-white text-center">Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setUser({ token: "TOKEN" });
          }}
          className="bg-transparent border-white border-[1px] px-3 w-full mt-6 py-4 rounded-lg"
        >
          <Text className="text-white text-center">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
