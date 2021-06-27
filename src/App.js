import React, {useRef} from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

// Firebase deps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Hooks
import { useAuthState } from './components/Utils/hooks';

import { Page, Layout, Cell, Card, Buttonm, Loader, Button, Box } from 'wix-style-react';
import LoginPage from "./components/loginPage/LoginPage";
import Channel from "./components/channel/Channel";
import Sidebar from "./components/sidebar/Sidebar";
import MainPage from "./components/mainPage/MainPage";
import AllUsersList from "./components/allUsersList/AllUsersList";
import {PageHeader} from "./components/pageHeader/PageHeader";

firebase.initializeApp({
  apiKey: "AIzaSyCQuiaqECfBKjETFi-I61XXKTbOh6B3aLM",
  authDomain: "messaging-832f1.firebaseapp.com",
  projectId: "messaging-832f1",
  storageBucket: "messaging-832f1.appspot.com",
  messagingSenderId: "168576274004",
  appId: "1:168576274004:web:37b3c5cbb0814eea00e7c1"
});

export let scrollRef;

const constant = "";

const App = () => {
  const state = useSelector((state) => ({isLogged: state.logged, page: state.page}), shallowEqual);
  const dispatch = useDispatch();

  const db = firebase.firestore();
  const { user, initializing } = useAuthState(firebase.auth());

  if(!initializing && user){
    dispatch({type: "SIGN_IN", payload: true})
  }

  if(user){

    const { uid, displayName, photoURL } = user;

    db.collection('users').doc(uid).set({
         uid,
        displayName,
        photoURL
    }, { merge: true });

  }


  const getContent = () => {
    if(!state.isLogged) return <LoginPage/>

    if(!user) return (
      <Box className="loader_parent">
        <Loader/>
      </Box>
    )

    if(state.page == "main"){
      return <MainPage/>
    }else if(state.page == "messenger" && user){
      return <Channel user={user} />
    }else if(state.page == "all_users"){
      return <AllUsersList uid={user.uid}/>
    }

  }

  const root = document.documentElement;
  root.style.setProperty('--page-content-height-with-bottom-padding', window.innerHeight - 144 + "px");
  root.style.setProperty('--page-content-height-without-bottom-padding', window.innerHeight - 96 + "px");

  const Header = React.useMemo(PageHeader ,[constant]);

  return(
    <Page className="page_parent" scrollableContentRef={ref => scrollRef = ref}>
      {Header}
      <Page.Content>
        <Sidebar/>
        {getContent()}
      </Page.Content>
    </Page>
  )
}

export default App;
