import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Card, Layout, TextButton, Heading, Cell, Box } from 'wix-style-react';
import {GoogleIcon} from "./../Utils/UtilComponents";
import s from './login.module.css';

const LoginPage = () => {
  const isLogged = useSelector((state) => state.logged, shallowEqual);
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    firebase.auth().useDeviceLanguage();
    // Start sign in process
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  return(
    <Box align="center" height={document.body.clientHeight-150+"px"} verticalAlign="middle">
      <Box width="576px" dataHook="box" >
        <Card showShadow className={s.login_card}>
          <Card.Content>
            <Layout alignItems="center" justifyItems="center" gap="14px">

              <Cell>
                <Heading appearance="H2">React Messenger</Heading>
              </Cell>

              <Cell>
                <Heading appearance="H5">The easiest way to chat with people all around the world.</Heading>
              </Cell>

              <Cell>
                <Box paddingTop="24px">
                  <div onClick={()=>{
                    // dispatch({type: "SIGN_IN", payload: true});
                    signInWithGoogle()
                    localStorage.setItem('logged', 'true');
                  }}>
                    <Card className={s.connect_button}>
                      <Box padding="12px 32px 12px 24px">
                        <GoogleIcon height="24" width="24"/>
                        <Box marginLeft="14px">
                          <TextButton weight="normal" size="medium" skin="dark" >Sign in with Google</TextButton>
                        </Box>
                      </Box>
                    </Card>
                  </div>
                </Box>
              </Cell>

            </Layout>
          </Card.Content>
        </Card>
      </Box>
    </Box>
  )
}

export default React.memo(LoginPage);
