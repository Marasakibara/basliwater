import { createNewUserProfile } from "@/fireworks";
import { useState } from "react";
import { Link } from "react-router-dom";

const Reg = () => {
  const [email, setEmail] = useState('')
  const [backMessage, setBackMessage] = useState('')
  const [login, setLogin] = useState('')
  const [backCode, setBackCode] = useState(-1)
  const onClickReg = () => {
    createNewUserProfile(email, login).then(
      (message) => {
        setBackCode(message.errorCode)
        setBackMessage(message.errorMessage)
        if (message.errorCode === 0) {
          window.location.pathname = '/auth'
        }
      }
    )
  }

  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value)
  }
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  return (
    <>
      <h1>reg</h1>
      <Link to='/auth'>Хотите авторизироваться?</Link>
      <div>
        <label htmlFor="email">Введите ваш e-mail: </label>
        <input type="email" onChange={onChangeEmail}></input>
        <input onChange={onChangeNickName} value={login}></input>
        <button onClick={onClickReg}>Зарегестрироваться</button>
        <div>{backMessage}</div>
      </div>
    </>
  );
};
export default Reg;
