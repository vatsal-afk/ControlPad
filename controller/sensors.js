import { Gyroscope, Accelerometer } from "expo-sensors";
import { useState, useEffect } from 'react';

export function useSensor(refreshRate = 3000) {
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  const [acclnData, setAcclnData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(refreshRate);
    Gyroscope.setUpdateInterval(refreshRate);

    const subscription = {
      accln: Accelerometer.addListener((acclnData) => {
        setAcclnData(acclnData);
      }),
      gyro: Gyroscope.addListener((gyroData) => {
        setGyroData(gyroData);
      }),
    };

    return () => {
      subscription.accln && subscription.accln.remove();
      subscription.gyro && subscription.gyro.remove();
    };
  }, [refreshRate]);

  return { gyroData, acclnData };
}
