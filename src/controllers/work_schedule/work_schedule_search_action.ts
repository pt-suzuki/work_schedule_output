import { WorkScheduleTranslator } from '~/domains/work_schedule/work_schedule_translator';
import { WorkScheduleService } from '~/domains/work_schedule/work_schedule_service';
import { WorkScheduleSearchResponder } from './work_schedule_search_responder';

export class WorkScheduleSearchAction {
  private reponder: WorkScheduleSearchResponder;
  private service: WorkScheduleService;
  private translator: WorkScheduleTranslator;

  constructor(
    reponder: WorkScheduleSearchResponder,
    service: WorkScheduleService,
    translator: WorkScheduleTranslator
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
