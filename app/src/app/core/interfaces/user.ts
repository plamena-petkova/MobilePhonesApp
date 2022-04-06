import { IBase } from './base';
import { IComment } from './comments';
import { IPhone } from './phone';

export interface IUser {
    
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    // accessToken: string
    // comments: IComment;
    // phones: IPhone[];
}