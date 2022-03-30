import { WorkSchedule } from '~/domains/work_schedule/work_schedule';
import { getJsonResponse } from '~/helper/response_helper';

export interface WorkScheduleSearchResponder {
  invoke(result: WorkSchedule[]): GoogleAppsScript.Content.TextOutput;
}

export class WorkScheduleSearchResponderImpl implements WorkScheduleSearchResponder {
  invoke(result: WorkSchedule[]): GoogleAppsScript.Content.TextOutput {
    return getJsonResponse<WorkSchedule[]>(result);
  }
}
