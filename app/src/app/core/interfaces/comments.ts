import { IBase } from './base';
import { IPhone } from './phone';
import { IUser } from './user';

export interface IComment extends IBase {
    text: string;
    userId: IUser;
    phoneId: IPhone
}