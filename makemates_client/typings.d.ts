export interface SignUpInputType {
  name: string;
  email: string;
  password: string;
  gender: string;
  day: string;
  month: string;
  year: string;
}

export interface NewPost {
  desc: string;
  imgUrl: string;
}

export interface LoginInputType {
  email: string;
  password: string;
}

export type AuthContextType = {
  currentUser: { _id: string };
  setCurrentUser: Dispatch<any>;
  userSignUp: (inputs: SignUpInputType) => void;
  userLogin: (inputs: LoginInputType) => void; // Correct type
  userLogout: () => void;
};
