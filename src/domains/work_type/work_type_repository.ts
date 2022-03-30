import { WorkType } from "./work_type";
import { WorkTypeCriteria } from "./work_type_criteria";
import { WorkTypeTranslator } from "./work_type_translator";

export interface WorkTypeRepository {
  search(criteria: WorkTypeCriteria): WorkType[];
}

export class WorkTypeRepositoryImpl implements WorkTypeRepository {
  private translator: WorkTypeTranslator;

  constructor(translator: WorkTypeTranslator) {
    this.translator = translator;
  }

  search(criteria: WorkTypeCriteria): WorkType[] {
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadSheet.getSheets().find((sheet) => {
      return sheet.getSheetName() === 'マスタ';
    });

    if (!sheet) return [];

    const list = sheet.getRange(2, 3, sheet.getLastRow(), 4).getValues();
    let result = this.translator.translateObjetsToResultList(list);

    if(criteria.isHoliday !== undefined) {
      result = result.filter((element) => element.isHoliday === criteria.isHoliday);
    }

    return result;
  }
}