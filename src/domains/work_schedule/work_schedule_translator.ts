import { WorkSchedule } from "./work_schedule";
import { WorkScheduleCriteria } from "./work_schedule_criteria";

export interface WorkScheduleTranslator {
  translateRequestToCriteria(request: GoogleAppsScript.Events.DoGet): WorkScheduleCriteria;
  translateObjetsToResultList(values: any[][], todayIndex: number): WorkSchedule[];
}

export class WorkScheduleTranslatorImpl implements WorkScheduleTranslator {
  translateRequestToCriteria(request: GoogleAppsScript.Events.DoGet): WorkScheduleCriteria {
    return {
      date: request && request.parameter && request.parameter.date ? new Date(request.parameter.date) : new Date()
    };
  }

  translateObjetsToResultList(values: any[][], todayIndex: number): WorkSchedule[] {
    const result: WorkSchedule[] = values.map((row) => {
      return {
        name: row[0],
        email: row[1],
        team: row[2],
        slackName: row[3],
        type: row[todayIndex -1],
        isHoliday: false,
      };
    });
    return result;
  }
}