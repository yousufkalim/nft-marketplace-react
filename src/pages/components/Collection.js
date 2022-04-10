import React from 'react';

import { Container, Tab, Tabs } from 'react-bootstrap';
import CollectionList from './CollectionList';

import '../styles/Collection.scss';

const Collection = () => {
  return (
    <div className={'collection'}>
      <Container>
        <h2>Find Your Favorite Collections</h2>
        <Tabs defaultActiveKey='Art' id='uncontrolled-tab-example'>
          <Tab eventKey='Fantasy' title='Fantasy'>
          </Tab>
          <Tab eventKey='Art' title='Art'>
            <CollectionList title='Art' />
          </Tab>
          <Tab eventKey='Anime' title='Anime'>

          </Tab>
          <Tab eventKey='Dinos' title='Dinos'>

          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Collection;
