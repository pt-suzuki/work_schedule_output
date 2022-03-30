import { WorkScheduleSearchAction } from "~/controllers/work_schedule/work_schedule_search_action";
import { WorkScheduleSearchResponderImpl } from "~/controllers/work_schedule/work_schedule_search_responder";
import { workScheduleService, workScheduleTranslator } from '~/provider/domains';

export const workScheduleSearchAction: WorkScheduleSearchAction = new WorkScheduleSearchAction(new WorkScheduleSearchResponderImpl(), workScheduleService, workScheduleTranslator);
