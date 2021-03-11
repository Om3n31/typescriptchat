import { User } from './user';
import { UserCed } from './user-ced';

export interface MessageCed {
    id: Number,
    message: String,
    dateMessage: Number,
    user: UserCed
}
