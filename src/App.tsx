import React, { useEffect } from 'react';
// @ts-expect-error
import * as d3 from "d3";

import dataPositionObject from './assets/porshe-video-object-detections.json';
import porcheVideo from './assets/porshe.mp4';
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

  const displayBox = (who: Apparence, time: number, index: number) => {
    const boxes = who.appearance.boxes;
      const box = boxes.find((box, index) => {
        if((box.time < time && boxes[index + 1]?.time > time) || (box.time > time && !boxes[index + 1])) {
          return box;
        } 
      });
      if(box) {
        const { bottomRight , topLeft } = box.box;
        const width = bottomRight.y - topLeft.y;
        const height = bottomRight.x - topLeft.x;
        const d3Container = d3.select('#container');
        d3Container.append('canvas')
        .attr('name', `canvas`)
        .attr('id', `canvas${index}`)
        .attr('width', width)
        .attr('height', height)
        .attr('style', `position: absolute; border: 2px solid yellow; top: ${topLeft.y}px; left: ${topLeft.x}px;`);
      }
  }

  const videoListener = (e: any): void => {
    const time = e.target.currentTime * 1000;
    const whoDisplay = anyApparences.filter((appearance) => {
      const { begin, end } = appearance.intervalApparence;
      return begin < time && end > time;
    });
    const canvas = document.getElementsByName('canvas');
    canvas.forEach((it) => it.remove());
    if (whoDisplay) {
      whoDisplay.forEach((who, index) => {
        document.getElementById(`canvas${index}`)?.remove();
        displayBox(who, time, index);
      })
    }
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
    <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
       <div style={{ position: 'relative' }} id="container">
          <video controls id="video">
            <source src={porcheVideo} type="video/mp4"/>
         </video>
        </div>
    </div>
  );
}

export default App;
