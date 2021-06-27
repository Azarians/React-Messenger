import React from 'react';
import {Box, Layout, Cell, Input, Button, Loader} from "wix-style-react";
import ChatHeader from "./../chatHeader/ChatHeader";
import Message from "./../message/Message";
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import {useFirestoreQuery} from "./../Utils/hooks";
import s from './channel.module.css';
import moment from "moment";

import {usePrevious} from "./../Utils/Utils";

import {scrollRef} from "./../../App"

const Channel = ({ user = null }) => {
  const newMessage = useSelector((state) => state.newMessage, shallowEqual);
  const selected_user_uid = useSelector((state) => state.selected_user_uid, shallowEqual);
  const dispatch = useDispatch();

  const { uid, displayName, photoURL } = user;

  const db = firebase.firestore();
  const myMessagesRef = db.collection(uid+"_sent_messages").where("to", "==", selected_user_uid);
  const selectedUserMessagesRef = db.collection(selected_user_uid+"_sent_messages").where("to", "==", uid);

  const allMessages = [...useFirestoreQuery( myMessagesRef ), ...useFirestoreQuery( selectedUserMessagesRef )];

  const handleOnSubmit = e => {

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {

      db.collection(uid+"_sent_messages").add({
        text: trimmedMessage,
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        photoURL,
        displayName,
        to: selected_user_uid
      })

      dispatch({type: 'SET_NEW_MESSAGE', payload: ''})

      // scrollRef.scrollIntoView({ behavior: 'smooth' });
      // scrollRef.scrollTo(0, scrollRef.scrollHeight)
    }
  };

  const sortedMessages = allMessages.sort((first, second) => moment(new Date(first.createdAt).getTime()).diff(new Date(second.createdAt).getTime()));

  if(!sortedMessages) return (
    <Box className="loader_parent">
      <Loader/>
    </Box>
  )

  return(
    <Box className={s.container} dataHook="box">
      <Layout>

        <Cell>
          <ChatHeader
            header1 = 'Welcome to'
            header2 = 'React Messenger'
            subHeader = 'This is the beginning of this chat.'
          />
        </Cell>

        <Cell>
          {allMessages?.map(message => <Message {...message} key={message.id} self={message.uid == uid}/>)}
        </Cell>

        <Cell>
          <Box dataHook="box">
            <Box marginRight="16px" dataHook="box">
              <Input value={newMessage} onChange={(e)=>dispatch({type: 'SET_NEW_MESSAGE', payload: e.target.value})} onEnterPressed={handleOnSubmit}/>
            </Box>

            <Button onClick={handleOnSubmit}>send</Button>
          </Box>
        </Cell>

      </Layout>
    </Box>
  )
}

export default React.memo(Channel)
