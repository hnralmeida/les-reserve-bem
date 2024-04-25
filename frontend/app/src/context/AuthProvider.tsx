// React
import React, { useContext, useEffect, useState } from "react";

import { AuthContextData, AuthContext } from "./index";
import { userData } from '../types';

// Controller for login services
import ExternalAuthService from "../services/API/control";

// import Api from "../services/api";

type Props = {
    children?: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [authData, setAuthData] = useState<userData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const app = ExternalAuthService.getInstance();

    useEffect(() => {
        setIsLoading(true);
        loadStorageData();
        setIsLoading(false);
    }, []);

    async function loadStorageData() {
        //Try get the data from Async Storage
        try {
            const data = window.localStorage?.getItem('AuthData$');

            if (data && data != undefined) {
                //If there are data, it's converted to an Object and the state is updated.
                console.log(String(data));
                const user = JSON.parse(String(data));

                setAuthData(user as userData);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    async function signIn(user: string, password: string): Promise<boolean> {
        setIsLoading(true);

        const userCD = await app.signInWithEmailAndPassword(user, password).catch((error:any) => {
            console.log(error);
            alert(error.message);
        });

        if (userCD) {
            console.log("userCD handle", userCD);

            setAuthData(userCD as userData);
            window.localStorage.setItem('AuthData$', JSON.stringify(userCD));
            setIsLoading(false);

            return new Promise(function (resolve) {
                setIsLoading(false);
                resolve(true);
            })
        }

        return new Promise(function (_, reject) {
            setIsLoading(false);
            reject(false);
        })

    }


    async function signOut() {
        setAuthData(null);
        setIsLoading(false);
        window.localStorage.removeItem('AuthData$');
        console.log('sign out');
    }

    function changeLoader(state: boolean) {
        setIsLoading(state);
    }

    return (
        <AuthContext.Provider
            value={{ authData, signIn, signOut, isLoading, changeLoader }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}