import {IChatService} from "./IChat.service";
import {Chat} from "../models/chat";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class ChatService extends Repository<Chat> implements IChatService {
}
