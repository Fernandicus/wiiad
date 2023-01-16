import { FetchApiCall } from "@/components/src/common/infrastructure/FetchApiCall";
import { LogInHandler } from "../use-case/handler/LogInHandler";
import { SingUpHandler } from "../use-case/handler/SingUpHandler";
import { LogIn } from "../use-case/LogIn";
import { SignUp } from "../use-case/SignUp";

const fetchApiCall = new FetchApiCall();
const signUp = new SignUp(fetchApiCall);
const logIn = new LogIn(fetchApiCall);

export const signUpHandler = new SingUpHandler(signUp);
export const logInHandler = new LogInHandler(logIn);
