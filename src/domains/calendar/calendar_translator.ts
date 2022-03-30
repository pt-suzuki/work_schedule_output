import { addDate } from "~/helper/date_helper";
import { Event } from "./calendar";
import { CalendarCriteria as CalendarCriteria } from "./calendar_criteria";

export interface CalendarTranslator {
  translateRequestToCriteria(request: GoogleAppsScript.Events.DoGet): CalendarCriteria;
  translateCalendarEventsToEvents(list: GoogleAppsScript.Calendar.CalendarEvent[]): Event[];
  transrateEventToDateList(events: Event[]): Date[];
}

export class CalendarTranslatorImpl implements CalendarTranslator {
  translateRequestToCriteria(request: GoogleAppsScript.Events.DoGet): CalendarCriteria {
    const date = new Date();
    return {
      name: request && request.parameter ? request.parameter.name : '',
      startTime: date,
      endTime: addDate(date, 2, 'month'),
    };
  }

  translateCalendarEventsToEvents(list: GoogleAppsScript.Calendar.CalendarEvent[]): Event[] {
    return list.map(item => {
      return {
        date: new Date(item.getStartTime().toDateString())
      };
    });
  }

  transrateEventToDateList(events: Event[]): Date[] {
    return events.map(event => event.date);
  }
}