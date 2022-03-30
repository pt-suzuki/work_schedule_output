import { WorkType } from "./work_type";
import { WorkTypeCriteria } from "./work_type_criteria";

export interface WorkTypeTranslator {
  translateRequestToCriteria(request: GoogleAppsScript.Events.DoGet): WorkTypeCriteria;
  translateObjetsToResultList(values: any[][]): WorkType[];
}

export class WorkTypeTranslatorImpl implements WorkTypeTranslator {
  translateRequestToCriteria(request: GoogleAppsScript.Events.DoGet): WorkTypeCriteria {
    return {
      isHoliday: request && request.parameter && request.parameter.isHoliday ? request.parameter.isHoliday === 'true' : undefined
    };
  }

  translateObjetsToResultList(values: any[][]): WorkType[] {
    const result: WorkType[] = values.map((row) => {
      return {
        name: row[0],
        isHoliday: row[1] !== '',
      };
    });
    return result;
  }
}