import { useEffect, useMemo, useRef, useState } from "react"
import styles from './musicPanel.module.scss'
import MusicPlayer from "../musicPlayer/musicPlayer"

type docType = {
    url: string, name: string
}
interface MusicPanelType {
    musicDoc: docType,
    setMusicDoc?: (value: docType) => void,
    onClickSubmitNewMusic?: (name: string, url: string) => void,
    docs: docType[]
}
const protoUrl = "https://cs21-1v4.vkuseraudio.net/s/v1/ac/63hoYCU_OvmY1uphIIXbBGU8bqkvQjstLwkcV4LMkYV3up_AonrlU6_mfdpDxOJtlUJKwQszqdNix45wvQDLrT0OLgHk5lvdbrMe9gDaR7Eqk9rsdtyVMU3r6m8FsZHNI0b9MSOPwZg5Pn8esMuJT1wwkR0g4GP5-4BDew9mo7eIzxU/index.m3u8?siren=1"
const MusicPanel: React.FC<MusicPanelType> = ({ musicDoc, setMusicDoc, onClickSubmitNewMusic, docs }) => {

    const [name, setName] = useState('')
    const [url, setUrl] = useState(protoUrl)
    const [inputName, setInputName] = useState('')
    const [inputUrl, setInputUrl] = useState('')
    const [status, setStatus] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [musicDocs, setMusicDocs] = useState([] as docType[])
    const isInitialized = useRef(false);

    useEffect(() => {
        if (docs.length > 0 && !isInitialized.current) {
            setMusicDocs(docs);
            isInitialized.current = true;
        }
    }, [docs]);
    const onChangeInputUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputUrl(e.target.value)
    }
    const onChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(e.target.value)
    }
    const onChangeSearchMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(docs)
        const value = e.target.value
        setSearchValue(value)
    }
    const filteredItems = useMemo(() => {
        return musicDocs.filter((doc) => { return doc.name.toLowerCase().includes(searchValue.toLowerCase()) })
    }, [musicDocs, searchValue])
    const onSubmitInput = () => {
        setName(inputName)
        setUrl(inputUrl)
        setMusicDoc({ name: name, url: url })
    }
    const popUp = () => {
        setStatus(!status)
    }
    const onClickSubmit = () => {
        onClickSubmitNewMusic(name, url)
        const newMusicUrl = url
        const newMusicName = name
        const newDocs = [...docs, { name: newMusicName, url: newMusicUrl }]
        setMusicDocs(newDocs)
    }
    return <div className={styles.musicContainer}>
        <button onClick={popUp}>Добавить музыку</button>
        {status ?
            <div>
                <div>
                    <input type="name" onChange={onChangeInputName} placeholder='Название трека' value={inputName}></input>
                    <input type="text" onChange={onChangeInputUrl} value={inputUrl} placeholder='Url трека'></input>
                    <button type='submit' onClick={onSubmitInput}>Подвердить(Enter)</button>
                </div>
                <div>
                    <button type='button' onClick={onClickSubmit}>Отправить</button>
                </div>
            </div > : <ul>
                <div className={styles.searchContainer}>
                    <input className={styles.searchBox} type="text" onChange={onChangeSearchMusic} placeholder="Поиск музыки" value={searchValue}></input>
                </div>
                {filteredItems.map((doc) => {
                    return (
                        <div key={doc.name}>
                            <button onClick={() => { setMusicDoc(doc) }}>{doc.name}</button>
                        </div>)
                })}
            </ul>}
        <MusicPlayer url={musicDoc.url}></MusicPlayer>
    </div>
}
export default MusicPanel