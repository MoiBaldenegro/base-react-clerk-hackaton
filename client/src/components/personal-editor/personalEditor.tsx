import { useEditorStore } from '../../store/editor.store';
import MainCodeWindow from '../core/main-code-window/mainCodeWindow';
import styles from './personalEditor.module.css';
// import { useOrganizationList } from '@clerk/clerk-react'

export const PersonalEditor = () => {

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
        <MainCodeWindow setCode={setCode} code={code} />
    </main>
  )
}