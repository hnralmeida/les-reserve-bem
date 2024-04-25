import React from "react";

// componentes
import DrawerStack from "./drawer.routes";
import { useAuth } from "../context/AuthProvider";
import { StackAuth } from './auth.routes';

export function Routes() {
  const { authData } = useAuth();

  return (
    <DrawerStack />
  )

  //if  (authData) return <DrawerStack />;
  // else return <StackAuth />;
}
