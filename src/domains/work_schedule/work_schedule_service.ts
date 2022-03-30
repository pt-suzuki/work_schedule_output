import { CalendarService } from "../calendar/calendar_service";
import { WorkSchedule } from "./work_schedule";
import { WorkScheduleCriteria } from "./work_schedule_criteria";
import { WorkScheduleRepository } from "./work_schedule_repository";
import { WorkScheduleTranslator } from "./work_schedule_translator";
import { WorkTypeService } from "~/domains/work_type/work_type_service";
import { addDate, isHolyday } from "~/helper/date_helper";

export interface WorkScheduleService {
  search(criteria: WorkScheduleCriteria): WorkSchedule[];
  hideOverDateColumn(): void;
  insertDateColumn(): void;
}

export class WorkScheduleServiceImpl implements WorkScheduleService {
  //private translator: WorkScheduleTranslator;
  private repository: WorkScheduleRepository;
  private calendarService: CalendarService;
  private workTypeService: WorkTypeService;

  constructor(_: WorkScheduleTranslator, repository: WorkScheduleRepository, calendarService: CalendarService, workTypeService: WorkTypeService) {
    // this.translator = translator;
    this.repository = repository;
    this.calendarService = calendarService;
    this.workTypeService = workTypeService;
  }

  search(criteria: WorkScheduleCriteria): WorkSchedule[] {
    const list = this.repository.search(criteria);

    const filterList = list.filter((item) => item.slackName !== '');

    const workTypes = this.workTypeService.search({});

    const result = filterList.map((item) => {
      const workType = workTypes.find((workType) => workType.name === item.type);
      if(workType) item.isHoliday = workType.isHoliday;
      item.date = criteria.date;
      return item;
    });

    return result;
  }

  hideOverDateColumn(): void {
    const criteria: WorkScheduleCriteria = {
      date: new Date()
    };
    this.repository.hideOverDateColumn(criteria);
  }

  insertDateColumn(): void {
    const borderLineDate = addDate(new Date(), 2, 'month');

    const lastDate = this.repository.getLastDate();

    if(lastDate == null) return;

    const publicHolidays = this.calendarService.getPublicHorydays();

    let currentDate = addDate(lastDate, 2, 'day');

    while(borderLineDate >= currentDate) {
      this.repository.createDateColumn(currentDate, isHolyday(currentDate, publicHolidays));
      currentDate = addDate(currentDate, 1, 'day');
    }
  }
}