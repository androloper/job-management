import {Repository} from "../../../services/repository";
import {Injectable} from "@angular/core";
import {Group} from "../models/group";
import {IGroupService} from "./IGroup.service";

@Injectable({
    providedIn: 'root'
})
export class GroupService extends Repository<Group> implements IGroupService {
}
