import { WorkType } from "./work_type";
import { WorkTypeCriteria } from "./work_type_criteria";
import { WorkTypeRepository } from "./work_type_repository";
import { WorkTypeTranslator } from "./work_type_translator";

export interface WorkTypeService {
  search(criteria: WorkTypeCriteria): WorkType[];
}

export class WorkTypeServiceImpl implements WorkTypeService {
  // private translator: WorkTypeTranslator;
  private repository: WorkTypeRepository;

  constructor(_: WorkTypeTranslator, repository: WorkTypeRepository) {
    // this.translator = translator;
    this.repository = repository;
  }

  search(criteria: WorkTypeCriteria): WorkType[] {
    const result = this.repository.search(criteria);
    return result.filter(item => item.name !== '');
  }
}