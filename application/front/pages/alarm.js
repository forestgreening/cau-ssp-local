import Webcam from 'react-webcam';
import React from 'react';
import AppLayout from '../components/AppLayout';

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
    },
    [webcamRef],
  );

  return (
    <>
      <AppLayout title="Alram">
        <Webcam
          audio={false}
          height={480}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
      </AppLayout>
    </>
  );
};

export default WebcamCapture;
