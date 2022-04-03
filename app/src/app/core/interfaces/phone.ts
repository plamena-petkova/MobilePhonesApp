import { IBase } from "./base";
import { IUser } from "./user";


export interface IPhone<T = string> extends IBase {
    phoneName: string;
    phonePrice: string;
    description: string[];
    img: string;
    releaseDate: string;
    phoneLikes: string[];
    comments: T[];
    // userId: IUser;
  }

  