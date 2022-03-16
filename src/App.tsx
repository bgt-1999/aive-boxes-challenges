import React from 'react';

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

  return (
    <video controls id="video">
      <source src={porcheVideo} type="video/mp4"/>
    </video>
  );
}

export default App;
