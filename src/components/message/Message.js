import React from 'react';
import {Box, Layout, Cell, Card, Avatar, Text} from "wix-style-react";
import s from './message.module.css';
import moment from 'moment';

const Message = ({
  createdAt = null,
  text = '',
  displayName = '',
  photoURL = '',
  self
}) => {

  return(
    <Box className={s.container} dataHook="box" padding="16px">

      <Layout gap="4px">

        {!self &&
          <Cell span={1} rows={2} dataHook={!self ? undefined : "cell-right"}>
            <Box height="54px" width="54px" borderRadius="50%">
              <img src={photoURL}/>
            </Box>
          </Cell>
        }

        <Cell span={11} dataHook={!self ? undefined : "cell-right"}>
          <Box className={s.name}>
            <Text>{displayName}</Text>
          </Box>
        </Cell>

        {self &&
          <Cell span={1} rows={2} dataHook="cell-right">
            <Box height="54px" width="54px" borderRadius="50%">
              <img src={photoURL}/>
            </Box>
          </Cell>
        }

        <Cell span={11} dataHook={!self ? undefined : "cell-right"}>
          {text &&
            <Box className={s.text}>
              <Text>{text}</Text>
            </Box>
          }
        </Cell>

      </Layout>

    </Box>
  )
}

export default React.memo(Message)
