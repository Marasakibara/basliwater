import { setDocToFirestore } from "@/fireworks"
import { useState } from "react"

interface MusicPanelType {
    setMusicUrl?: (value: string) => void,
    onClickSubmitNewMusic?: (name: string, url: string) => void
}
const MusicPanel: React.FC<MusicPanelType> = ({ setMusicUrl, onClickSubmitNewMusic }) => {

    const [name, setName] = useState('')
    const [url, setUrl] = useState('')


    const [inputName, setInputName] = useState('')
    const [inputUrl, setInputUrl] = useState('')

    const [status, setStatus] = useState(false)

    const onChangeInputUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputUrl(e.target.value)
    }
    const onChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(e.target.value)
    }

    const onSubmitInput = () => {
        setName(inputName)
        setUrl(inputUrl)
        setMusicUrl(inputUrl)
    }
    const popUp = () => {
        setStatus(!status)
    }
    const onClickSubmit = () => {
        onClickSubmitNewMusic(name, url)
    }
    return <>
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
            </div > : <></>}
    </>
}
export default MusicPanel