import { createContext } from "react";

interface SignupContextType {
  signUp: boolean
  setSignUp: (value: boolean) => void
}

export const SignupContext = createContext<SignupContextType>({
  signUp: false,
  setSignUp: () => {}
})

interface LoginContextType {
  login: boolean
  setLogin: (value: boolean) => void
}

export const LoginContext = createContext<LoginContextType>({
  login: false,
  setLogin: () => {}
})