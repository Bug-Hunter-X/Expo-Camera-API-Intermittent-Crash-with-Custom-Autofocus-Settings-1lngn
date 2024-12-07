```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { StyleSheet, Text, View, Button } from 'react-native';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const [cameraRef, setCameraRef] = React.useState(null);
  const [autoFocus, setAutoFocus] = React.useState('on'); // Start with 'on'

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleAutoFocusChange = () => {
      setAutoFocus(autoFocus === 'on' ? 'off' : 'on');
      if(cameraRef){ // Check for valid reference
        cameraRef.setAutoFocus(autoFocus === 'on' ? 'on' : 'off')
        .catch(e=>{console.error('Autofocus error',e)});
      }
  };

  if (hasPermission === null) {
    return <View/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref)=>setCameraRef(ref)} autoFocus={autoFocus}>
        <View
          style={styles.buttonContainer}>
          <Button
            title="Flip Camera"
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }} />
          <Button
            title={`Autofocus: ${autoFocus}`}
            onPress={handleAutoFocusChange} />
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
});
```