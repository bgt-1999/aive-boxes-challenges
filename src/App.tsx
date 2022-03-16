import React from 'react';

import porcheVideo from './assets/porshe.mp4';

const App: React.FC = () => {
  return (
    <video controls id="video">
      <source src={porcheVideo} type="video/mp4"/>
    </video>
  );
}

export default App;
