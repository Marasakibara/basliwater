import ReactHlsPlayer from "@/audio"
import { useMemo, useRef } from "react"
import styles from './musicPlayer.module.scss'
type MusicPlayerType = {
    url: string
}
const MusicPlayer: React.FC<MusicPlayerType> = ({ url }) => {
    const playerRef = useRef(null);
    const handleVideoEnd = () => {
        if (playerRef.current) {
            playerRef.current.currentTime = 0; // Перемотка в начало
            playerRef.current.play(); // Автовоспроизведение
        }
    };
    return useMemo(() => {
        return <ReactHlsPlayer
            className={styles.video}
            src={url}
            autoPlay={true}
            playerRef={playerRef}
            controls={true}
            onEnded={handleVideoEnd}
        >
        </ReactHlsPlayer>
    }, [url])
}
export default MusicPlayer