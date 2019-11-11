import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import tabStyles from '../CSS/tabs.module.css';

import TrackPanel from './Track_Panel';
import Help from './Help_Panel';
import About from './About_Panel';

export default () => (
  <Tabs className={tabStyles['tabs']}>
    <TabList>
      <Tab>T.R.A.C.K.</Tab>
      <Tab>Help</Tab>
      <Tab>About</Tab>
    </TabList>

    <TabPanel>
      <TrackPanel />
    </TabPanel>

    <TabPanel>
      <Help />
    </TabPanel>

    <TabPanel>
      <About />
    </TabPanel>
  </Tabs>
);