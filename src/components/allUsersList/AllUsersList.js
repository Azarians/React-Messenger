import React from 'react';
import {Box, Layout, Cell, Loader} from "wix-style-react";
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import {useFirestoreQuery} from "./../Utils/hooks";
import Message from "./../message/Message";
import ChatHeader from "./../chatHeader/ChatHeader";
import s from './allUsers.module.css';

const AllUsersList = ({uid}) => {
  const dispatch = useDispatch();

  const db = firebase.firestore();
  const usersRef = db.collection('users').where("uid", "!=", uid);
  const users = useFirestoreQuery( usersRef );

  if(!users){
    return <Box className="loader_parent">
             <Loader/>
           </Box>
  }

  return(
    <Box className={s.container} dataHook="box">
      <Layout>

          <Cell>
            <ChatHeader
              header1 = "React Messenger"
              header2 = "all users"
              subheadr = "select user to send message"
            />
          </Cell>

          {users
            ?.sort((first, second) => first.displayName.localeCompare(second.displayName))
            ?.map((user, i) => (
                <Cell key={i}>
                  <div onClick={()=>dispatch({type: "SELECT_USER", payload: user.uid}) }>
                    <Message {...user} />
                  </div>
                </Cell>
          ))}

      </Layout>
    </Box>
  )
}

export default React.memo(AllUsersList);
