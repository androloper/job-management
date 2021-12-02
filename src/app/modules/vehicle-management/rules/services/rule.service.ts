import {Repository} from "../../../services/repository";
import {Injectable} from "@angular/core";
import {Rule} from "../models/rule";
import {IRuleService} from "./IRule.service";

@Injectable({
    providedIn: 'root'
})
export class RuleService extends Repository<Rule> implements IRuleService {
}
