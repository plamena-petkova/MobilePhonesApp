import { IBase } from "./base";
import { IUser } from "./user";


export interface IPhone<> extends IBase{ 
    phoneName: string;
    phonePrice: string;
    description: string[];
    img: string;
    releaseDate: string;
    owner: string;
    likes: string[];
    rating: number;
    // comments: T[];
  }

  