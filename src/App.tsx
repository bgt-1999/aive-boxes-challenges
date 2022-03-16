import React, { useEffect } from 'react';

import porcheVideo from './assets/porshe.mp4';
import dataPositionObject from './assets/porshe-video-object-detections.json';
import { Apparence } from './utils/types';

const App: React.FC = () => {
  const anyApparences: Apparence[] = [];
  const objects =  dataPositionObject.data.analysis.objects;
  objects.forEach((object) => {
    object.appearances.forEach((appearance) => {
      anyApparences.push({ 
        objectClass: object.objectClass,
        id: object.id,
        appearance: appearance,
        intervalApparence: {
          begin: appearance.boxes[0].time,
          end: appearance.boxes[appearance.boxes.length - 1].time
        }
      });
    })
  });

  const videoListener = (e: any): void => {
    const time = e.target.currentTime * 1000;
    console.log('time', time);
  };

  useEffect(() => {
    const video = document.querySelector('video');
    video && video.addEventListener('timeupdate', videoListener);
    
    return () => {
      const video = document.querySelector('video');
      video && video.removeEventListener('timeupdate', videoListener);
    }
  }, [])

  return (
    <video controls id="video">
      <source src={porcheVideo} type="video/mp4"/>
    </video>
  );
}

export default App;
