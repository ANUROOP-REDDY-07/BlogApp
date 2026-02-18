import React, { createContext, useState } from "react";


export const userAuthorContextObj = createContext();


export const UserAuthorProvider = ({ children }) => {
  const [currUserAuthor, setCurrUserAuthor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImageUrl: "",
    role: "",
  });

  return (
    <userAuthorContextObj.Provider value={{ currUserAuthor, setCurrUserAuthor }}>
      {children}
    </userAuthorContextObj.Provider>
  );
};
