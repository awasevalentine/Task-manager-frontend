

// type of data to be sent to the user registeration endpoint
export interface TokenPayload{
  email: string;
  password: string;
  name: string;
}




export interface TokenResponse{
  token: string;
}


//This are the information to be extracted fromt the returned token from the server
export interface UserDetails {
  name: string;
  email: string;
  password: string;
  exp?: number;
  iat?: number;
  userId?: string;
}
