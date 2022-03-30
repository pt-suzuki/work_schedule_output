import { WorkTypeTranslator, WorkTypeTranslatorImpl } from "~/domains/work_type/work_type_translator";
import { WorkTypeRepository, WorkTypeRepositoryImpl } from "~/domains/work_type/work_type_repository";
import { WorkTypeService, WorkTypeServiceImpl } from "~/domains/work_type/work_type_service";

export const workTypeTranslator: WorkTypeTranslator = new WorkTypeTranslatorImpl();
const workTypeRepository: WorkTypeRepository = new WorkTypeRepositoryImpl(workTypeTranslator);

export const workTypeService: WorkTypeService = new WorkTypeServiceImpl(workTypeTranslator, workTypeRepository);
