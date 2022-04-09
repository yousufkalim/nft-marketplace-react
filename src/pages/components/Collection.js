import React from 'react';

import { Container, Tab, Tabs } from 'react-bootstrap';
import CollectionList from './CollectionList';

import '../styles/Collection.scss';

const Collection = () => {
  return (
    <div className={'collection'}>
      <Container>
        <h2>Find Your Favorite Collections</h2>
        <Tabs defaultActiveKey='Comics' id='uncontrolled-tab-example'>
          <Tab eventKey='Fantasy' title='Fantasy'>
            <CollectionList />
          </Tab>
          <Tab eventKey='Comics' title='Comics'>
            <CollectionList />
          </Tab>
          <Tab eventKey='Anime' title='Anime'>
            <CollectionList />
          </Tab>
          <Tab eventKey='Dinos' title='Dinos'>
            <CollectionList />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Collection;
