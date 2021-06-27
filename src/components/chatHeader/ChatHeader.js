import React from 'react';
import {Layout, Cell, Heading, Box} from "wix-style-react";
import s from "./chatHeader.module.css";

const ChatHeader = ({ header1, header2, subHeader }) => {

  return(
    <Box padding="40px 0" dataHook="box" className={s.container}>
      <Layout justifyItems="center" gap="6px">

        {header1 &&
          <Cell>
            <Heading appearance="H2">{header1}</Heading>
          </Cell>
        }

        {header2 &&
          <Cell>
            <Heading appearance="H2">{header2}</Heading>
          </Cell>
        }

        {subHeader &&
          <Cell>
            <Heading appearance="H6">{subHeader}</Heading>
          </Cell>
        }

      </Layout>
    </Box>
  )
}

export default React.memo(ChatHeader)
