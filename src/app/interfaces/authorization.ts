export interface Authorization {
  user: userInfo;
  token: string;
}

export interface userInfo {
  name: string;
}

// {
//     "user": {
//         "name": "john"
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTNmZjRhNjI5OTdiMTNhMjcxZGNiODMiLCJuYW1lIjoiam9obiIsImlhdCI6MTY5ODkwOTU5MSwiZXhwIjoxNzAxNTAxNTkxfQ.4SqVWn2RKl6-crzfd3lN4Fs7A6dYCoIBw-UOKhyMM4Q"
// }
