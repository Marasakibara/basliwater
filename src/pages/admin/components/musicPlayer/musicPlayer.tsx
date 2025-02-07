import ReactHlsPlayer from "@/audio"
import { useMemo } from "react"
type MusicPlayerType = {
    url: string
}
const MusicPlayer: React.FC<MusicPlayerType> = ({ url }) => {
    return useMemo(() => {
        return <ReactHlsPlayer
            src={url}
            autoPlay={true}
            controls={true}
        >
        </ReactHlsPlayer>
    }, [url])
}
export default MusicPlayer