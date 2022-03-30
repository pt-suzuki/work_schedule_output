import { CalendarTranslator, CalendarTranslatorImpl } from "~/domains/calendar/calendar_translator";
import { CalendarServiceImpl, CalendarService } from "~/domains/calendar/calendar_service";
import { CalendarRepository, CalendarRepositoryImpl } from "~/domains/calendar/calendar_repository";

export const calendarTranslator: CalendarTranslator = new CalendarTranslatorImpl();
const calendarRepository: CalendarRepository = new CalendarRepositoryImpl(calendarTranslator);

export const calendarService: CalendarService = new CalendarServiceImpl(calendarTranslator, calendarRepository);