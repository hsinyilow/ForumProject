import React from "react";
import { Dispatch, SetStateAction} from 'react'


interface UserContextType {
    username: string;
    userID: number;
    setCurrentUser:  Dispatch<SetStateAction<{ userID: number; username: string; }>>;
}

const defaultUser: UserContextType = {username: "", userID:-1, setCurrentUser: () => {}}

// set the defaults
const UserContext = React.createContext<UserContextType>(defaultUser);

export default UserContext;