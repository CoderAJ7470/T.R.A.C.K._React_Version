import React from 'react';

import aboutPanelStyles from '../CSS/aboutPanel.module.css';

export default function About() {
  return (
    <>
      <h3>About Terminal Region Airspace Control Kit (T.R.A.C.K.) V2.0</h3>

      <p className={aboutPanelStyles['info']}>
        Just this ATC thingamabob, ya know?
      </p>

      <p className={aboutPanelStyles['info']}>Created with react v16.11.0, react-tabs v3.0.0 and react-beautiful-dnd v12.0.0</p>
    </>
  )
}