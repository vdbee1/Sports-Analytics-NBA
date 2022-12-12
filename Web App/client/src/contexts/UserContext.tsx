import { User } from "../types/User"
import React, { createContext, useState, useContext, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { tryGetUser, tryCreateNewUser, tryFindRoom } from "../utils/DataUtils"
import { useToast } from "@chakra-ui/react"
import { UserQueryResponse } from "../types/UserQueryResponse";
interface ContextType {
  user: User | null;
  createNewUser: (user: User) => void;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  createRoom: (roomCode: string) => void;
  joinRoom: (roomCode: string) => void;
  inRoom: boolean
}

export const UserContext = createContext<ContextType>({
  user: null,
  login: async () => { return null },
  logout: () => { },
  createNewUser: () => { },
  createRoom: () => { },
  joinRoom: () => { },
  inRoom: false
});

export const UserContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [inRoom, setInRoom] = useState<boolean>(false);
  const toast = useToast();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser)
    }
  }, [])

  const createNewUser = async (newUser: User) => {
    const res: UserQueryResponse = await tryCreateNewUser(
      "/signup", newUser
    )

    if (res.status === "error") {
      toast({
        status: "error",
        title: res.title,
        description: res.text
      })
    }
    else {
      toast({
        status: "success",
        title: res.title,
        description: res.text
      })

      setUser(res.user)
    }
  }

  const login = async (email: string, password: string): Promise<User | null> => {
    const res: (UserQueryResponse) = await tryGetUser(
      "/login", email, password
    )
    if (res.status === "error") {
      toast({
        status: "error",
        title: res.title,
        description: res.text,
      })
    }
    else {
      toast({
        status: "success",
        title: res.title,
        description: res.text,
      })

      setUser(res.user)
      if (res.user?.room_id) {
        setInRoom(true)
      }
      localStorage.setItem("user", JSON.stringify(res.user))
    }
    return res.user;
  }

  const logout = () => {
    setUser(null)
    toast({
      status: "info",
      title: "Logged out"
    })
    setInRoom(false)
    localStorage.clear()
  }

  const joinRoom = async (roomCode: string) => {
    if (user) {
      const res = await tryFindRoom(
        "/joinroom", roomCode, user.email
      )
      if (res.status === "error") {
        toast({
          status: "error",
          title: res.title,
          description: res.text,
        })
      }
      else {
        toast({
          status: "success",
          title: res.title,
          description: res.text,
        })
        user.room_id = roomCode;
        setInRoom(true)
      }
    }
    else return;
  }

  const createRoom = async (roomCode: string) => {
    if (user) {
      const res = await tryFindRoom(
        "/createroom", roomCode, user.email
      )
      if (res.status === "error") {
        toast({
          status: "error",
          title: res.title,
          description: res.text,
        })
      }
      else {
        toast({
          status: "success",
          title: res.title,
          description: res.text,
        })
        user.room_id = roomCode;
        setInRoom(true)
      }
    }
    else return;
  }
  return (
    <UserContext.Provider
      value={{
        user,
        createNewUser,
        login,
        logout,
        createRoom,
        joinRoom,
        inRoom
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useFantasyTeam must be used within a UserContextProvider"
    );
  }
  return context;
};