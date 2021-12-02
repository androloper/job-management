import {IFileManagerService} from "./IFileManager.service";
import {FileManager} from "../models/file-manager";
import {Injectable} from "@angular/core";
import {Repository} from "../../../services/repository";

@Injectable({
    providedIn: 'root'
})
export class FileManagerService extends Repository<FileManager> implements IFileManagerService {
}
