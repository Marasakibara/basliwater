import { useEffect, useState } from "react";
import styles from './Admin.module.scss'
import { getAllDocsFromFirestore, getDocFromFirestore, setDocToFirestore } from "@/fireworks";
import MusicPlayer from "./components/musicPlayer/musicPlayer";
import ImagePanel from "./components/imagePanel";
import MusicPanel from "./components/musicPanel";
import { useAuth } from "@/auth/AuthContext";


const url = 'https://psv4.vkuseraudio.net/s/v1/a2/UMgenzyUHteVY06-TNAkQLLixUvdSbD3nU0mxrDYWQCASiljVwLF2c2Ik6TdM7d1sgrFddzmZwngC8or7QpdBXJlOsAIbp8qM4DtTPQnQKUlBCHrGuRZkMmitmbStj-MN7UbYsm0uKB6hHYwqmhWSDCaB0H3i9ifZA/index.m3u8?siren=1'
const Admin = () => {
  const [imageListJSX, setImageListJSX] = useState([<></>])
  const [docs, setDocs] = useState([] as { url: string, name: string }[])
  const [imageDoc, setImageDoc] = useState({ 'url': '', 'name': '' })
  const [musicDoc, setMusicDoc] = useState({ 'url': '', 'name': '' })
  const [searchMusicValue, setSearchMusicValue] = useState('')
  const [searchImageValue, setSearchImageValue] = useState('')
  const [musicListJSX, setMusicListJSX] = useState([<></>])

  const { auth } = useAuth()
  const generateImageJSX = (docs: { url: string, name: string }[]) => {
    const JSXArray = docs.map((doc) => {
      return (
        <div key={doc.name}>
          <input value={doc.name} onClick={() => setImageDoc(doc)}></input>
          <img className={styles.imageItem} src={doc.url} alt='Картинка отвалилась'></img>
        </div>)
    })
    return JSXArray
  }
  const onChangeSearchMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchMusicValue(value)
    const newDocs = docs.filter((doc) => { return doc.name.toLowerCase().includes(value.toLowerCase()) })
    setMusicListJSX(generateMusicJSX(newDocs))
  }
  const generateMusicJSX = (docs: { url: string, name: string }[]) => {
    const JSXArray = docs.map((doc) => {
      return (
        <div key={doc.name}>
          <button onClick={() => { setMusicDoc(doc) }}>{doc.name}</button>
        </div>)
    })
    return JSXArray
  }

  useEffect(() => {
    getAllDocsFromFirestore('imageListData').then((resp: { url: string, name: string }[]) => {
      setImageListJSX(generateImageJSX(resp))
    })
    getAllDocsFromFirestore('musicListData').then((resp: { url: string, name: string }[]) => {
      setDocs(resp)
      setMusicListJSX(generateMusicJSX(resp))
    })

  }, [])
  const test = (value: string) => {
    setMusicDoc({ 'url': value, 'name': '' })
  }
  const onClickSubmitNewMusic = (name: string, url: string) => {
    console.log(name, url)
    setDocToFirestore('musicListData', name, {
      name: name,
      url: url
    })
    const newMusicUrl = url
    const newMusicName = name
    const newDocs = [...docs, { name: newMusicName, url: newMusicUrl }]
    setDocs(newDocs)
  }
  const onSetUpPlayer = (playerName: string, imageUrl: string, musicUrl: string) => {
    setDocToFirestore('gameSpace', `${playerName}`, {
      imageUrl,
      musicUrl
    })
  }
  return (
    <>
      <h1>adminPanel</h1>
      <div>
        <ImagePanel></ImagePanel>
        <ul>
          {imageListJSX}
        </ul>
        <MusicPanel setMusicUrl={test} onClickSubmitNewMusic={onClickSubmitNewMusic}></MusicPanel>
        <ul>
          <input type="text" onChange={onChangeSearchMusic} placeholder="Поиск музыки" value={searchMusicValue}></input>
          {musicListJSX}
        </ul>
      </div>
      <div>
        <input value={imageDoc.name} />
        <img className={styles.imageItem} src={imageDoc.url} alt=''></img>
        <input value={musicDoc.name}></input>
        <MusicPlayer url={musicDoc.url}></MusicPlayer>
        <button onClick={() => { onSetUpPlayer(auth.currentUser.displayName, imageDoc.url, musicDoc.url) }}>Отправить</button>
      </div>
    </>
  );
};
export default Admin;
