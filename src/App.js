import React from 'react';

import Tabs from './Components/Tabs';

import appStyles from './CSS/app_panel.module.css';

function App() {
  return (
    <div className={appStyles['app']}>
      <Tabs />
    </div>
  );
}

export default App;
