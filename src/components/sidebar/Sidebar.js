import React from 'react';
import {Sidebar, SidebarSectionItem, SidebarBackButton, CloseButton, IconButton } from "wix-style-react";
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {MenuIcon} from "./../Utils/UtilComponents";
import s from "./sidebar.module.css";


const SidebarMenu = () => {
  const {sidebarOpened, logged} = useSelector((state) =>({ sidebarOpened: state.sidebarOpened, logged: state.logged}), shallowEqual);
  const dispatch = useDispatch();

  const toggleSidebar = () => dispatch({type: "TOGGLE_SIDEBAR", payload: !sidebarOpened});

  const changePage = page =>{
    dispatch({type: "CHANGE_PAGE", payload: page});
    toggleSidebar()
  }

  return(
    <>
      {logged &&
        <div className={s.open_sidebar_button}>
          <IconButton onClick={()=>dispatch({type: "TOGGLE_SIDEBAR", payload: true})} skin="transparent">
            <MenuIcon style={{height: 20}}/>
          </IconButton>
        </div>
      }
      <Sidebar selectedKey={'item1'} isHidden={!sidebarOpened} dataHook="sidebar_parent">
        <Sidebar.PersistentHeader>
          <div className={s.sidebar_header}>
            <div>Menu</div>
            <CloseButton size="medium" onClick={toggleSidebar} className={s.close_button}/>
          </div>
        </Sidebar.PersistentHeader>

        <SidebarSectionItem onClick={()=>changePage('main')}>main</SidebarSectionItem>
        {/*<SidebarSectionItem onClick={()=>changePage('messenger')}>messenger</SidebarSectionItem>*/}
        <SidebarSectionItem onClick={()=>changePage('all_users')}>all users</SidebarSectionItem>

        {/*<Sidebar.Item
          itemKey={'apps'}
          innerMenu={[
            <Sidebar.BackButton>
              <SidebarBackButton>Main Menu</SidebarBackButton>
            </Sidebar.BackButton>,
            <SidebarSectionItem>Inner item 1</SidebarSectionItem>,
            <SidebarSectionItem>Inner item 2</SidebarSectionItem>,
          ]}
        >
          <SidebarSectionItem drillable>Inner Menu</SidebarSectionItem>
        </Sidebar.Item>*/}

      {/*  <Sidebar.PersistentFooter>
          <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }} >
            Powered by Me
          </div>
        </Sidebar.PersistentFooter>*/}
      </Sidebar>
    </>
  )
}

export default React.memo(SidebarMenu)
