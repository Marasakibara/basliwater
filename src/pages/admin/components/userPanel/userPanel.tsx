import { useState } from "react"
import styles from './userPanel.module.scss'

type docType = {
    url: string, name: string
}
type userType = {
    imageDoc: docType, musicDoc: docType, message: string, login: string
}
interface UserPanelType {
    users: userType[],
    setMusicDoc: (value: docType) => void,
    dynamicUsers: userType[],
    setDynamicUsers: (value: userType[]) => void,
    setNewMessage: (value: string) => void

}
const UserPanel: React.FC<UserPanelType> = ({ users, setMusicDoc, dynamicUsers, setDynamicUsers, setNewMessage }) => {
    const [currentUser, setCurrentUser] = useState({} as userType)

    const onAddDynamicUser = (doc: userType) => {
        if (!dynamicUsers.some(u => u.login === doc.login)) {
            setDynamicUsers([...dynamicUsers, doc]);
        }
    }
    const onRemoveDynamicUser = (login: string) => {
        setDynamicUsers(dynamicUsers.filter((obj) => obj.login !== login))
    }
    return (
        <>
            <div className={styles.listContainer}>
                <ul>Игроки:
                    {
                        users.map((user) => {
                            return (
                                <li key={user.login}>
                                    <button onClick={() => { setCurrentUser(user); setNewMessage(user.message) }}>{user.login}</button>
                                    <button onClick={() => { onAddDynamicUser(user) }}>+</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <ul>Получатели:
                        {dynamicUsers.map((user) => {
                            return (
                                <li key={user.login}>
                                    <button onClick={() => { onRemoveDynamicUser(user.login) }}>{user.login}</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div>
                {currentUser.imageDoc !== undefined ?
                    <>
                        <div className={styles.imageCard}>
                            <div className={styles.texts}>{currentUser.imageDoc.name}</div>
                            <img className={styles.image} src={currentUser.imageDoc.url} alt=''></img>
                        </div>
                        <div className={styles.texts}>Музыка: </div>
                        <button onClick={() => { setMusicDoc(currentUser.musicDoc) }}>{currentUser.musicDoc.name}</button>
                        <div className={styles.texts}>Текст: </div>
                        <label className={styles.texts}>{currentUser.message}</label>
                    </> : <></>}
            </div >
        </>)
}
export default UserPanel