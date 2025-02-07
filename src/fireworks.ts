import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { app, db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const auth = getAuth(app);
const password = "~od;CfB1bGi9V2-P.m=dGtrd=2[uQx";

export const createNewUserProfile = (email: string) => {
  const message = createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: user.email,
        photoURL:
          "https://sun9-50.userapi.com/impg/rXWzjZ0YoLM8zKVEsqhsHRjjkXrvfK00Z2NBIw/rgwIfC5FwPE.jpg?size=604x604&quality=96&sign=c079d0ccd08a9dd3c15be967e44c1f80&type=album",
      });
      console.log("createNewUserProfile " + user);
      return { errorCode: 0, errorMessage: "Вы успешно зарегестрировались!" };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, " :", errorMessage);
      switch (errorCode) {
        case "auth/email-already-in-use":
          return { errorCode: 401, errorMessage: "e-mail уже использован!" };
        case "auth/invalid-email":
          return { errorCode: 402, errorMessage: "e-mail введён некорректно!" };
        case "auth/missing-email":
          return { errorCode: 404, errorMessage: "вы не ввели e-mail!" };
      }
    });
  return message;
};
export const singOnUserProfile = (email: string) => {
  const message = signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("singOnUserProfile " + user);
      return { errorCode: 0, errorMessage: "Вы успешно вошли!" };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, " :", errorMessage);
      switch (errorCode) {
        case "auth/invalid-credential":
          return {
            errorCode: 401,
            errorMessage: "нет пользователя с таким e-mail!",
          };
        case "auth/invalid-email":
          return { errorCode: 402, errorMessage: "e-mail введён некорректно!" };
        case "auth/missing-email":
          return { errorCode: 404, errorMessage: "вы не ввели e-mail!" };
      }
    });

  return message;
};
export const updateUserProfile = (photoUrl: string) => {
  updateProfile(auth.currentUser, {
    photoURL: photoUrl,
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      console.log(error);
    });
};
export const singOutUserProfile = () => {
  signOut(auth)
    .then(() => {
      console.log("Успешно вышел");
    })
    .catch((error) => {
      console.log(error);
    });
};
export const setDocToFirestore = async (
  collecName: string,
  docName: string,
  sendDoc: any
) => {
  await setDoc(doc(db, collecName, docName), sendDoc)
    .then((resp) => {
      console.log("write setDocToFirestore " + resp);
    })
    .catch((e) => {
      console.log(e.errorCode);
    });
};
export const getDocFromFirestore = async (
  collecName: string,
  docName: string
) => {
  const docRef = doc(db, collecName, docName);
  const newDoc = await getDoc(docRef)
    .then((resp) => {
      console.log("read");
      const newDoc = resp.data();
      return newDoc;
    })
    .catch((e) => {
      console.log(e.errorCode);
    });

  return newDoc;
};
export const getAllDocsFromFirestore = async (collecName: string) => {
  const querySnapshot = await getDocs(collection(db, collecName));
  const newDocs = [] as {}[];
  querySnapshot.forEach((doc) => {
    const newDoc = doc.data();
    newDocs.push(newDoc);
  });
  console.log("read");
  return newDocs;
};
