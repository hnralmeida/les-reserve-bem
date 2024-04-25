import { createContext } from 'react';
import { userData } from '../types';

export interface AuthContextData {
    authData?: userData | null;
    signIn: (user: string, password: string) => Promise<boolean>;
    signOut: () => Promise<void>;
    isLoading: boolean;
    changeLoader: (state: boolean) => void;
}

export const AuthContext = createContext({} as AuthContextData);