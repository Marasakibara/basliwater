import { useAuth } from '@/auth/AuthContext';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDocFromFirestore, singOutUserProfile } from '@/fireworks';

const Header = () => {
    const { auth, isAuth } = useAuth();
    const [imgUrl, setImgUrl] = useState('https://sun9-50.userapi.com/impg/rXWzjZ0YoLM8zKVEsqhsHRjjkXrvfK00Z2NBIw/rgwIfC5FwPE.jpg?size=604x604&quality=96&sign=c079d0ccd08a9dd3c15be967e44c1f80&type=album')
    const [login, setLogin] = useState('' as string | null);
    const [isAdmin, setIsAdmin] = useState(false)
    const onClickSingOut = () => {
        singOutUserProfile()
        setIsAdmin(false)
    }
    useEffect(() => {
        if (isAuth) {
            const user = auth.currentUser;
            if (user !== null) {
                setLogin(user.displayName);
                setImgUrl(user.photoURL)
                getDocFromFirestore('admin', auth.currentUser.email).then((resp) => {
                    if (resp) {
                        setIsAdmin(resp.isAdmin)
                    }
                }).catch((e) => { console.log(e.errorCode) })
            }
        }
    }, [auth.currentUser, isAuth]);
    return (
        <div className={styles.header}>
            <div data-testid={'App'}>
                <div></div>
                <Link to={'/main'}>main </Link>
                <Link to={'/info'}>info </Link>
                <Link to={'/about'}>about </Link>
                {isAdmin ? <Link to={'/admin'}>amdin </Link> : <></>}
                {
                    isAuth ? <>
                        <img className={styles.avatar} src={imgUrl} alt='avatar.png'></img>
                        <Link to='/auth'>{login}</Link>
                        <button onClick={onClickSingOut}>Выйти</button>
                    </> : <>
                        <Link to={'/auth'}>auth </Link>
                        <Link to={'/reg'}>reg </Link>
                    </>
                }
            </div>
        </div>
    );
};
export default Header;