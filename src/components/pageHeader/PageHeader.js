import React from 'react';
import {ModeBtn} from "./../Utils/UtilComponents";
import {Page} from "wix-style-react";
import "./pageHeader.css";

export const PageHeader = () => {

  return(
    <Page.Header
      actionsBar={<ModeBtn/>}
      title="React Messenger"
    />
  )
}
