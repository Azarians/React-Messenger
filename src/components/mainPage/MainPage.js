import React from 'react';
import {Box, Text} from "wix-style-react";
import ChatHeader from "./../chatHeader/ChatHeader";

const MainPage = () => {

  return(
    <Box align="center" dataHook="box">
      <ChatHeader
        header1="Main Page"
        subHeader="coming soon..."
      />
    </Box>
  )
}

export default React.memo(MainPage);
