import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState("");
  const value = {
    userList: [
      { id: "u1", name: "vochomůrka" },
      { id: "u2", name: "křemílek" },
      { id: "u3", name: "rákosníček" },
    ],
    loggedInUser,
    setLoggedInUser,
  };
  return (
    <UserContext.Provider value={value} loggedInUser={loggedInUser}>
      {children}
    </UserContext.Provider>
  );
}