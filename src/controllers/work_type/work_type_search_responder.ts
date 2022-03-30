import { WorkType } from '~/domains/work_type/work_type';
import { getJsonResponse } from '~/helper/response_helper';

export interface WorkTypeSearchResponder {
  invoke(result: WorkType[]): GoogleAppsScript.Content.TextOutput;
}

export class WorkTypeSearchResponderImpl implements WorkTypeSearchResponder {
  invoke(result: WorkType[]): GoogleAppsScript.Content.TextOutput {
    return getJsonResponse<WorkType[]>(result);
  }
}
