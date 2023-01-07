export interface User {
  id:number;
  username:string;
  password:string;
  api_key: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface UserInfo {
  info: {
    sub: string,
    email: string,
    name: string,
    picture: string
  }
}
