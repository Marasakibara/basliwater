import { useAuth } from "@/auth/AuthContext";
import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

type docType = {
  url: string, name: string
}
type userType = {
  imageDoc: docType, musicDoc: docType, message: string, login: string
}

const Main = () => {
  const { auth } = useAuth();
  const [userData, setUserData] = useState({ imageDoc: { url: '', name: '' }, musicDoc: { url: '', name: '' }, login: '', message: '' } as userType)
  const displayName = auth.currentUser?.displayName
  useEffect(() => {
    if (displayName) {
      onSnapshot(doc(db, 'gameSpace', displayName), (doc) => {
        setUserData(doc.data() as userType)
      })
    }
  }, [displayName])

  return (
    <>
      <h1>Игра</h1>
      <div>
        <img src={userData.imageDoc.url} alt='Image_Broken'></img>
      </div>
      <div style={{ color: 'white' }}>
        {userData.message}
      </div>
    </>
  );
};
export default Main;
