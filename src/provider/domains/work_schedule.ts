import { WorkScheduleTranslator, WorkScheduleTranslatorImpl } from "~/domains/work_schedule/work_schedule_translator";
import { WorkScheduleServiceImpl, WorkScheduleService } from "~/domains/work_schedule/work_schedule_service";
import { WorkScheduleRepositoryImpl, WorkScheduleRepository } from "~/domains/work_schedule/work_schedule_repository";
import { calendarService } from './calendar';
import { workTypeService } from './work_type';

export const workScheduleTranslator: WorkScheduleTranslator = new WorkScheduleTranslatorImpl();
const workScheduleRepository: WorkScheduleRepository = new WorkScheduleRepositoryImpl(workScheduleTranslator);

export const workScheduleService: WorkScheduleService = new WorkScheduleServiceImpl(workScheduleTranslator, workScheduleRepository, calendarService, workTypeService);

