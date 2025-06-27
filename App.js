import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { createAudioPlayer, setAudioModeAsync } from "expo-audio";
import { useEffect } from "react";

const breakEnd = require("./break-end.mp3");

let player;

async function stopSound() {
  if (player) {
    player.seekTo(0);
    player.pause();
  }
}

function playSound() {
  console.log("Playing");
  try {
    if (!player) {
      player = createAudioPlayer(breakEnd);
      player.volume = 1;
      player.addListener("playbackStatusUpdate", async (audio) => {
        if (audio.didJustFinish) {
          console.log("Sound finished.");
          stopSound();
        }
      });
    } else if (player) {
      stopSound();
    }

    if (player) {
      player.seekTo(0);
      player.play();
    }
  } catch (error) {
    console.log(error);
  }
}

export default function App() {
  useEffect(() => {
    const initSound = async () => {
      console.log("Setting up Android Audio Mode");
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          interruptionModeAndroid: "duckOthers",
          shouldPlayInBackground: false,
          interruptionMode: "duckOthers",
        });
      } catch (e) {
        console.error(e);
      }

      console.log("Audio Set-Up complete");
    };
    initSound();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Test Audio" onPress={() => playSound()}></Button>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
