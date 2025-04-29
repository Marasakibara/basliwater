import { useAuth } from "@/auth/AuthContext";
import { singOnUserProfile, updateUserProfile } from "@/fireworks";
import { ImgHTMLAttributes, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './auth.module.scss';
const Auth = () => {
  const { auth, isAuth } = useAuth();

  const [email, setEmail] = useState('')
  const [backMessage, setBackMessage] = useState('')
  const [isChangeAvatar, setIsChangeAvatar] = useState(false)
  const [backCode, setBackCode] = useState(-1)
  const [imgUrl, setImgUrl] = useState(
    'https://sun9-50.userapi.com/impg/rXWzjZ0YoLM8zKVEsqhsHRjjkXrvfK00Z2NBIw/rgwIfC5FwPE.jpg?size=604x604&quality=96&sign=c079d0ccd08a9dd3c15be967e44c1f80&type=album')
  const [newImgUrl, setNewImgUrl] = useState('')
  const [login, setLogin] = useState('' as string | null);
  const onClickAuth = () => {
    singOnUserProfile(email).then(
      (message) => {
        setBackCode(message.errorCode)
        setBackMessage(message.errorMessage)
      }
    )
  }
  const onClickChangeAvatar = () => {
    setIsChangeAvatar(!isChangeAvatar)
  }
  const onClickSubmitAvatar = () => {
    updateUserProfile(newImgUrl)
  }
  useEffect(() => {
    if (isAuth) {
      const user = auth.currentUser;
      if (user !== null) {
        setLogin(user.displayName);
        setImgUrl(user.photoURL)
      }
    }
  }, [auth.currentUser, isAuth]);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const onChangeNewUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewImgUrl(e.target.value)
  }
  return (
    <>
      {isAuth ? <>
        <img className={styles.avatar} src={imgUrl} alt='avatar.png'></img>
        <button onClick={onClickChangeAvatar}>Сменить аватар</button>
        <div>
          {isChangeAvatar ? <>
            <input type="text" onChange={onChangeNewUrl} />
            {newImgUrl ? <img className={styles.avatar} src={newImgUrl} alt='newAvatar.png'></img> : <></>}
            <input type="submit" onClick={onClickSubmitAvatar}></input>
          </> : <></>}</div>
        <div>{login}</div>
      </> :
        <>
          <h1>auth</h1>
          <Link to='/reg'>Хотите зарегестрироваться?</Link>
          <div>
            <label htmlFor="email">Введите ваш e-mail: </label>
            <input type="email" onChange={onChangeEmail}></input>
            <button onClick={onClickAuth}>Войти в аккаунт</button>
            <div>{backMessage}</div>
          </div>
        </>}
    </>
  );
};
export default Auth;
