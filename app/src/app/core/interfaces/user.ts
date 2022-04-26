import { IBase } from './base';
import { IComment } from './comments';
import { IPhone } from './phone';

export interface IUser {
    
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    // comments: IComment;
    // phones: IPhone[];
}