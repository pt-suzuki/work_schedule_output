import { addDate } from "~/helper/date_helper";
import { Event } from "./calendar";
import { CalendarCriteria } from "./calendar_criteria";
import { CalendarRepository } from "./calendar_repository";
import { CalendarTranslator } from "./calendar_translator";

export interface CalendarService {
  search(criteria: CalendarCriteria): Event[];
  getPublicHorydays(endTime?: Date): Date[];
}

export class CalendarServiceImpl implements CalendarService {
  private translator: CalendarTranslator;
  private repository: CalendarRepository;

  constructor(translator: CalendarTranslator, repository: CalendarRepository) {
    this.translator = translator;
    this.repository = repository;
  }

  search(criteria: CalendarCriteria): Event[] {
    return this.repository.search(criteria);
  }

  getPublicHorydays(endTime: Date = addDate(new Date(), 2, 'month')): Date[] {
    const date = new Date();

    const criteria: CalendarCriteria = {
      name: '日本の祝日',
      startTime: date,
      endTime
    };
    const result = this.search(criteria);

    return this.translator.transrateEventToDateList(result);
  }
}