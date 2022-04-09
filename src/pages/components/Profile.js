import React from 'react';

import { Container, Tab, Tabs } from 'react-bootstrap';


import '../styles/Collection.scss';
import ProfileData from './profileData';
import PasswordChange from './PasswordChange';
import SecQuestion from './SecQuestion';

const Profile = () => {
    return (
        <div className={'collection profiles'}>
            <Container>
                <h2>My Profile</h2>
                <Tabs defaultActiveKey='General' id='uncontrolled-tab-example'>
                    <Tab eventKey='General' title='General Profile'>
                        <ProfileData />
                    </Tab>
                    <Tab eventKey='password' title='Password Change'>
                        <PasswordChange />
                    </Tab>
                    <Tab eventKey='sec' title='Security Question'>
                        <SecQuestion />
                    </Tab>

                </Tabs>
            </Container>
        </div>
    );
};

export default Profile;
