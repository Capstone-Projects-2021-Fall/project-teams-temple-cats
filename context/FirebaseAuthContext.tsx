import React from "react";
import firebase from "../utils/firebase";

export const AuthContext = React.createContext<firebase.User | null>(null);