import { getAllDocsFromFirestore, setDocToFirestore } from "@/fireworks"
import { useEffect, useMemo, useState } from "react"
import styles from './imagePanel.module.scss'

type docType = {
    url: string, name: string
}
type props = {
    setImageDoc: React.Dispatch<React.SetStateAction<docType>>;
    docs: docType[]
};
const ImagePanel = ({ setImageDoc, docs }: props) => {
    const [imageName, setImageName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [newImageStatus, setNewImageStatus] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const onChangeImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value)
    }
    const onChangeImageName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageName(e.target.value)
    }
    const filteredItems = useMemo(() => {
        return docs.filter((doc) => { return doc.name.toLowerCase().includes(searchValue.toLowerCase()) })
    }, [docs, searchValue])
    const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchValue(value)
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
    return (
        <>
            <button onClick={imagePopUp}>Добавить изображение</button>
            {newImageStatus ? <div className={styles.galleryContainer}>
                <div className={styles.formGroup}>
                    <input type="text" onChange={onChangeImageName} value={imageName} placeholder="Название" />
                </div>
                <div className={styles.formGroup}>
                    <input type="text" onChange={onChangeImageUrl} value={imageUrl} placeholder="URL" />
                </div>
                <div className={styles.imageCard}>
                    <img className={styles.image} src={imageUrl} style={{ aspectRatio: '16:9', width: '250px' }} alt='newAvatar.png'></img>
                </div>
                <button type="submit" onClick={onClickSubmitNewImage}></button>
            </div> :
                <>
                    <div>
                        <input value={searchValue} onChange={onChangeSearchValue} placeholder="Поиск картинки"></input>
                    </div>
                    <div className={styles.galleryContainer}>
                        <div className={styles.imageList}>
                            {filteredItems.map((doc) => {
                                return (
                                    <div key={doc.name} className={styles.imageCard}>
                                        <div style={{ color: 'white' }}>{doc.name}</div>
                                        <img className={styles.image} src={doc.url} alt='Картинка отвалилась' loading="lazy" onClick={() => setImageDoc(doc)}></img>
                                    </div>)
                            })}
                        </div>
                    </div>
                </>}
        </>
    )
}
export default ImagePanel