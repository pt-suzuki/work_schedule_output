import { WorkTypeTranslator } from '~/domains/work_type/work_type_translator';
import { WorkTypeService } from '~/domains/work_type/work_type_service';
import { WorkTypeSearchResponder } from './work_type_search_responder';

export class WorkTypeSearchAction {
  private reponder: WorkTypeSearchResponder;
  private service: WorkTypeService;
  private translator: WorkTypeTranslator;

  constructor(
    reponder: WorkTypeSearchResponder,
    service: WorkTypeService,
    translator: WorkTypeTranslator
  ) {
    this.reponder = reponder;
    this.service = service;
    this.translator = translator;
  }

  invoke(
    request: GoogleAppsScript.Events.DoGet
  ): GoogleAppsScript.Content.TextOutput {
    return this.reponder.invoke(
      this.service.search(this.translator.translateRequestToCriteria(request))
    );
  }
}
