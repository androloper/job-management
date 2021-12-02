import {INotesService} from "./INotes.service";
import {Notes} from "../models/notes";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class NotesService extends Repository<Notes> implements INotesService {
}
