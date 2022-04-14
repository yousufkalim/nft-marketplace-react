import React from 'react';

import { Container } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import CollectionList from './CollectionList';

import '../styles/Collection.scss';

const Collection = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div className={'collection'}>
      <Container>
        <h2>Find Your Favorite Collections</h2>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Art</Tab>
            <Tab>Anime</Tab>
            <Tab>Comics</Tab>
          </TabList>
          <TabPanel>
            <CollectionList id={tabIndex} />
          </TabPanel>
          <TabPanel>
            <CollectionList id={tabIndex} />
          </TabPanel>
          <TabPanel>
            <CollectionList id={tabIndex} />
          </TabPanel>
        </Tabs>
      </Container>
    </div>
  );
};

export default Collection;




