
import { Event } from "./calendar";
import { CalendarCriteria } from "./calendar_criteria";
import { CalendarTranslator } from "./calendar_translator";

export interface CalendarRepository {
  search(criteria: CalendarCriteria): Event[];
}

export class CalendarRepositoryImpl implements CalendarRepository {
  private translator: CalendarTranslator;

  constructor(translator: CalendarTranslator) {
    this.translator = translator;
  }

  search(criteria: CalendarCriteria): Event[] {
    const calendars = CalendarApp.getAllCalendars();

    const calendar = calendars.filter((calendar) => calendar.getName() === criteria.name);

    if (calendar.length == 0) return [];

    const events = calendar[0].getEvents(criteria.startTime, criteria.endTime);

    return this.translator.translateCalendarEventsToEvents(events);
  }
}