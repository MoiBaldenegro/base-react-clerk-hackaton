import { useState } from 'react';
import { useEditorStore } from '../../store/editor.store';
import MoisesSidebar from '../colaborative-room/moises/moisesIA';
import MainCodeWindow from '../core/main-code-window/mainCodeWindow';
import styles from './personalEditor.module.css';
import { MoisesChat } from '../examples/moisesChat';
// import { useOrganizationList } from '@clerk/clerk-react'

export const PersonalEditor = () => {
  const [openChat, setOpenChat] = useState(false);

//   const { isLoaded, setActive, userMemberships } = useOrganizationList({
//     userMemberships: {
//       infinite: true,
//     },
//   })
//   if (!isLoaded) {
//     return <>Loading</>
//   }
//   if (!userMemberships) {
//     return <>No memberships</>
//   }
const code = useEditorStore((state) => state.code);
const setCode = useEditorStore((state) => state.setCode);
  return (
    <main className={styles.workspace} >
        <MainCodeWindow setCode={setCode} code={code} openChat={()=> setOpenChat(!openChat)}/>
         <div
        className={`${styles.sidebarContainer} ${openChat ? styles.sidebarOpen : ''}`}
        style={{ width: "420px" }}
          >
        <MoisesSidebar children="children" isOpen={openChat} onClose={()=> {
          setOpenChat(!openChat)
        }} > 
          <MoisesChat />
        </MoisesSidebar>
       
      </div> 
    </main>
  )
}