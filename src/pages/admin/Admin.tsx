import { useEffect, useState } from "react";
import styles from './Admin.module.scss'
import { getAllDocsFromFirestore, setDocToFirestore } from "@/fireworks";
import MusicPlayer from "./components/musicPlayer/musicPlayer";
import ImagePanel from "./components/imagePanel/imagePanel";
import MusicPanel from "./components/musicPanel/musicPanel";
import UserPanel from "./components/userPanel/userPanel";
type docType = {
  url: string, name: string
}
type userType = {
  imageDoc: docType, musicDoc: docType, message: string, login: string
}
type errorType = {
  code: number,
  errorText: string,
}
const imageProto =
  "https://sun9-50.userapi.com/impg/rXWzjZ0YoLM8zKVEsqhsHRjjkXrvfK00Z2NBIw/rgwIfC5FwPE.jpg?size=604x604&quality=96&sign=c079d0ccd08a9dd3c15be967e44c1f80&type=album";
const musicProto =
  "https://cs21-1v4.vkuseraudio.net/s/v1/ac/63hoYCU_OvmY1uphIIXbBGU8bqkvQjstLwkcV4LMkYV3up_AonrlU6_mfdpDxOJtlUJKwQszqdNix45wvQDLrT0OLgHk5lvdbrMe9gDaR7Eqk9rsdtyVMU3r6m8FsZHNI0b9MSOPwZg5Pn8esMuJT1wwkR0g4GP5-4BDew9mo7eIzxU/index.m3u8?siren=1";

const Admin = () => {
  const [images, setImages] = useState([] as docType[])
  const [users, setUsers] = useState([] as userType[])
  const [dynamicUsers, setDynamicUsers] = useState([] as userType[])
  const [musics, setMusics] = useState([] as docType[])
  const [imageDoc, setImageDoc] = useState({ 'url': imageProto, 'name': '' } as docType)
  const [musicDoc, setMusicDoc] = useState({ 'url': musicProto, 'name': '123' } as docType)
  const [newMessage, setNewMessage] = useState('')
  const [errorCode, setErrorCode] = useState({ code: 0, errorText: 'Нет Ошибок' } as errorType)
  //const [searchImageValue, setSearchImageValue] = useState('')
  //const { auth } = useAuth()

  const onChangeNewMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
  }
  const uploadUserData = () => {
    if (imageDoc.name == '') {
      console.log(1)
      setErrorCode({ code: 1, errorText: 'imageDoc пустой' })
    } else if (musicDoc.name == '') {
      console.log(2)
      setErrorCode({ code: 2, errorText: 'musicDoc пустой' })
    } else if (dynamicUsers.length === 0) {
      console.log(3)
      setErrorCode({ code: 3, errorText: 'Получатели не выбраны' })
    } else {
      console.log(4)
      setErrorCode({ code: 0, errorText: 'Нет Ошибок' });
      dynamicUsers.forEach((user) => {
        setDocToFirestore('gameSpace', user.login, {
          imageDoc: imageDoc,
          message: newMessage,
          musicDoc: musicDoc,
          login: user.login
        })
      })
    }

  }
  useEffect(() => {
    getAllDocsFromFirestore('imageListData').then((resp: docType[]) => {
      setImages(resp)
    })
    getAllDocsFromFirestore('musicListData').then((resp: docType[]) => {
      setMusics(resp)
    })
    getAllDocsFromFirestore('gameSpace').then((resp: userType[]) => {
      console.log(resp)
      setUsers(resp)
    })
  }, [])
  const onClickSubmitNewMusic = (name: string, url: string) => {
    setDocToFirestore('musicListData', name, {
      name: name,
      url: url
    })
  }
  return (
    <>
      <h1>adminPanel</h1>
      <div className={styles.panelContainer}>
        <div className={styles.panel}>
          <div className={styles.contrainer}>
            <ImagePanel setImageDoc={setImageDoc} docs={images}></ImagePanel>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.contrainer}>
            <MusicPanel musicDoc={musicDoc} setMusicDoc={setMusicDoc} onClickSubmitNewMusic={onClickSubmitNewMusic} docs={musics}></MusicPanel>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.contrainer}>
            <UserPanel
              users={users}
              setMusicDoc={setMusicDoc}
              dynamicUsers={dynamicUsers}
              setDynamicUsers={setDynamicUsers}
              setNewMessage={setNewMessage}
            />
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.contrainer}>
            <h1 className={styles.whiteText}>Данные: </h1>
            <div>
              <label className={styles.whiteText}>{imageDoc.name != '' ? imageDoc.name : 'Картинка: '}</label>
              <img className={styles.imageItem} src={imageDoc.url} alt='Картинка отвалилась'></img>
            </div>
            <label className={styles.whiteText}>{musicDoc.name != '' ? `Музыка: ` + musicDoc.name : 'Картинка: '}</label>
            <div>
              <div className={styles.whiteText}>Текст: </div>
              <input value={newMessage} onChange={onChangeNewMessage} />
            </div>
            <div>
              <button onClick={uploadUserData}>Отправить</button>
              {errorCode.code === 0 ? 'Всё норм' : errorCode.code + errorCode.errorText}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
