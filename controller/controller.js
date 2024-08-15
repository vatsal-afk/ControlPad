import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import * as ScreenOrientation from "expo-screen-orientation";
import { useSensor } from './sensors.js';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
} from 'react-native-cool-speedometer';

const Controller = ({ route }) => {
  const data = useSensor();
  const { username,ip } = route.params;

  const ws = useRef(null);

  const [orientation, setOrientation] = useState(1);
  const lockOrientation = async () => {
  try {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
    const o = await ScreenOrientation.getOrientationAsync();
    setOrientation(o);
  } 
  catch (error) {
    console.error('Error locking orientation:', error);
  }
};

  useEffect(()=>{
    
    ws.current = new WebSocket(`ws://${ip}:8080`);

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      // ws.current.send('Hello, server!');
    };

    ws.current.onmessage = (e) => {
      console.log(e.data);
    };

    ws.current.onerror = (e) => {
      console.log('WebSocket error:', e.message);
    };

    ws.current.onclose = (e) => {
      console.log('WebSocket connection closed:', e.code, e.reason);
    };

    lockOrientation();

    return()=>{
      if (ws.current) {
        ws.current.close();
      }
    };
  },[]);

  useEffect(() => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        gyro : { 
          x: data.gyroData.x.toFixed(2),
          y: data.gyroData.y.toFixed(2),
          z: data.gyroData.z.toFixed(2),
        },
        acclo : { 
          x: data.acclnData.x.toFixed(2),
          y: data.acclnData.y.toFixed(2),
          z: data.acclnData.z.toFixed(2),
        },
        latency : {
          Time : 0,
        }
      }));
    }
  }, [data]);

  const handleAccelerate = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({throttle:"accelerate"}));
    }
  };

  const handleBrake = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({throttle:"brake"}));
    }
  };

  return (
    <>
      <View style={styles.container}>
      <View style={styles.display}>
        <View style={styles.speedometerContainer}>
        <Speedometer
          value={Math.abs(data.gyroData.z.toFixed(2))*10}>
          <Background />
          <Arc/>
          <Needle/>
          <Progress/>
          <Marks/>
          <Indicator/>
        </Speedometer>
        </View>
        <View style={styles.networkContainer}>
          <Text style={styles.text}>In action : {username}</Text>
          <Text style={styles.text}>latency : </Text>
        </View>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handleBrake}>
          <Text style={styles.text}>Brake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAccelerate}>
          <Text style={styles.text}>Accelerate</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  display: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    //backgroundColor: '#41e86e',
    height: '60%',
  },
  networkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'orange',
    height: '60%',
    width: '20%',
    borderRadius: 15, 
    marginRight: '5%',
  },
  speedometerContainer: {
    justifyContent: 'center',
    //alignItems: 'center',
    marginLeft: '30%',
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F0EF',
    height: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#555',
    height: '35%',
  },
  button: {
    backgroundColor: 'orange',
    padding: 20,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    width: '40%',
  },
  text: {
  }
});

export default Controller;
