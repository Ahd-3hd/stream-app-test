import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { View, Button, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import io from "socket.io-client";

export default function App() {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<any>();
  const socketRef = useRef<any>();

  useEffect(() => {
    socketRef.current = io("http://10.0.2.2:3000");
    socketRef.current.on("getTime", (time: any) => {
      console.log(time);
    });
  }, []);

  const onStateChange = useCallback((state) => {
    console.log(state);
    socketRef.current.emit(
      "getTime",
      playerRef.current
        ?.getCurrentTime()
        .then((currentTime: any) => handleSeekChange(currentTime))
    );
    // if (state === "ended") {
    //   setPlaying(false);
    //   Alert.alert("video has finished playing!");
    //   console.log(state);
    // }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const handleSeekChange = (data: any) => {
    console.log(data);
    socketRef.current.emit("getTime", data);
  };

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
            .then((currentTime: any) => handleSeekChange(currentTime));

          // playerRef.current
          //   ?.getDuration()
          //   .then((getDuration: any) => console.log({ getDuration }));
        }}
      />
    </View>
  );
}
