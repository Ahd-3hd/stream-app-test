import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useCallback } from "react";
import { View, Button, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function App() {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<any>();

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
      console.log(state);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <StatusBar style="auto" />
      <YoutubePlayer
        ref={playerRef}
        height={300}
        play={playing}
        videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
      <Button
        title="log details"
        onPress={() => {
          playerRef.current
            ?.getCurrentTime()
            .then((currentTime: any) => console.log({ currentTime }));

          playerRef.current
            ?.getDuration()
            .then((getDuration: any) => console.log({ getDuration }));
        }}
      />
    </View>
  );
}
