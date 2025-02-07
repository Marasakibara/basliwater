import { getAllDocsFromFirestore, setDocToFirestore } from "@/fireworks"
import { useEffect, useState } from "react"
import styles from '../Admin.module.scss'

const ImagePanel = () => {
    const [imageName, setImageName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [newImageStatus, setNewImageStatus] = useState(false)

    const [docs, setDocs] = useState([] as { url: string, name: string }[])

    const onChangeImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value)
    }
    const onChangeImageName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageName(e.target.value)
    }
    const onClickSubmitNewImage = () => {
        setDocToFirestore('imageListData', imageName, {
            name: imageName,
            url: imageUrl
        })
    }
    const imagePopUp = () => {
        setNewImageStatus(!newImageStatus)
    }

    // Можно добавить редактирование 

    return <div>
        <button onClick={imagePopUp}>Добавить изображение</button>
        {newImageStatus ? <>
            <input type="text" onChange={onChangeImageName} value={imageName} />
            <input type="text" onChange={onChangeImageUrl} value={imageUrl} />
            <img className={styles.newImage} src={imageUrl} alt='newAvatar.png'></img>
            <button type="submit" onClick={onClickSubmitNewImage}></button>
        </> : <></>}
    </div>
}
export default ImagePanel