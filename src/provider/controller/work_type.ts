import { WorkTypeSearchAction } from "~/controllers/work_type/work_type_search_action";
import { WorkTypeSearchResponderImpl } from "~/controllers/work_type/work_type_search_responder";
import { workTypeService, workTypeTranslator } from '~/provider/domains';

export const workTypeSearchAction: WorkTypeSearchAction = new WorkTypeSearchAction(new WorkTypeSearchResponderImpl(), workTypeService, workTypeTranslator);