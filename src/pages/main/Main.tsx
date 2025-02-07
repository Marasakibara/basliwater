import { useAuth } from "@/auth/AuthContext";
import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const Main = () => {
  const { auth } = useAuth();
  const [url, setUrl] = useState('')
  const [userData, setUserData] = useState({ imageUrl: '', musicUrl: '' })
  const displayName = auth.currentUser?.displayName
  useEffect(() => {
    if (displayName) {
      onSnapshot(doc(db, 'gameSpace', displayName), (doc) => {
        setUserData(doc.data() as { imageUrl: '', musicUrl: '' })
      })
    }
  }, [displayName])
  const onClickButton = () => {
    setUrl(userData.imageUrl)
  }
  return (
    <>
      <h1>Игра</h1>
      <button onClick={onClickButton}></button>
      <div><img src={userData.imageUrl} alt='Image_Broken'></img>
        <img src={url} alt='Image_Broken'></img></div>
    </>
  );
};
export default Main;
