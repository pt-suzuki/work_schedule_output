import { getApiType } from './helper/request_helper';
import { workScheduleSearchAction, workTypeSearchAction } from './provider/controller';
import { workScheduleService } from './provider/domains';

declare const global: any;

global.doGet = (request: GoogleAppsScript.Events.DoGet): GoogleAppsScript.Content.TextOutput => {
  if(!request) return workScheduleSearchAction.invoke(request);

  switch(getApiType(request.queryString)){
    case 'work_type':
      return workTypeSearchAction.invoke(request);
    case 'work_schedule':
      return workScheduleSearchAction.invoke(request);
    default:
      return workScheduleSearchAction.invoke(request);
  }
}

global.hideSchedule = (): void => {
  workScheduleService.hideOverDateColumn();
}

global.insertDateColumn = (): void => {
  workScheduleService.insertDateColumn();
}
