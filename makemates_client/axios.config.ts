import axios from "axios";
import { LoginInputType, SignUpInputType } from "./typings";

const API_ENDPOINT = "http://localhost:5000";

export async function CreateNewUser(inputData: SignUpInputType) {
  const response = await axios.post(
    API_ENDPOINT + "/user/register",
    inputData,
    { withCredentials: true }
  );
  return response;
}

export async function SignInUser(inputData: LoginInputType) {
  const response = await axios.post(API_ENDPOINT + "/user/login", inputData, {
    withCredentials: true,
  });
  console.log(response);
  return response.data;
}
export async function getUserDataById() {
  const { data } = await axios.get(API_ENDPOINT + "/user/me", {
    withCredentials: true,
  });
  return data;
}

export async function fetchUserPosts(userId: any) {
  const { data } = await axios.get(API_ENDPOINT + "/posts/" + userId, {
    withCredentials: true,
  });

  return data;
}

export async function LogOutUser() {
  const { data } = await axios.get(API_ENDPOINT + "/user/logout", {
    withCredentials: true,
  });

  return data;
}
