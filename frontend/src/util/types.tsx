export interface User {
  userid: number;
  username: string;
  email: string;
  isadmin: boolean;
}

export interface Room {
  roomid: number;
  roomname: string;
  roomdescription: string;
  roomprice: number;
  roomurl: string;
}

export interface Booking {
  bookingid: number;
  userid: number;
  firstname: string;
  roomid: number;
  datestart: string;
  dateend: string;
}

export interface DecodedToken {
  userID: number;
  isAdmin: boolean;
  exp: number;
}
