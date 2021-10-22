import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import firebase from "../utils/firebase";
import { Button } from "react-native";

export default function Mod() {
    return (
        <React.Fragment>
            <Button
                color="#8b0000"
                title="Report"
                onPress={() => {
                    alert("Report button pressed");
                }}
            />
            <Button
                color="#8b0000"
                title="Annoucements"
                onPress={() => {
                    alert("Annoucements button pressed");
                }}
            />
        </React.Fragment>

    );
}