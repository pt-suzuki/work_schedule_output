import { getDate } from "~/helper/date_helper";
import { WorkSchedule } from "./work_schedule";
import { WorkScheduleCriteria } from "./work_schedule_criteria";
import { WorkScheduleTranslator } from "./work_schedule_translator";

export interface WorkScheduleRepository {
  search(criteria: WorkScheduleCriteria): WorkSchedule[];
  hideOverDateColumn(criteria: WorkScheduleCriteria): void;
  getLastDate(): Date | null;
  createDateColumn(date: Date, isHoliday: boolean): void;
}

export class WorkScheduleRepositoryImpl implements WorkScheduleRepository {
  private translator: WorkScheduleTranslator;

  constructor(translator: WorkScheduleTranslator) {
    this.translator = translator;
  }

  getLastDate(): Date | null {
    const sheet = this.getScheduleSheet();
    if (!sheet) return null;

    const column = sheet.getLastColumn();

    const strDate = sheet.getRange(1, column).getValue();
    return new Date(strDate);
  }

  createDateColumn(date: Date, isHoliday: boolean): void {
    const sheet = this.getScheduleSheet();
    if (!sheet) return;

    const lastColumNum = sheet.getLastColumn();

    sheet.insertColumnAfter(lastColumNum);

    const templateSheet = this.getTemplateScheduleSheet();

    if (!templateSheet) return;

    if(isHoliday) {
      templateSheet.getRange(1, 3).copyTo(sheet.getRange(2, lastColumNum + 1, sheet.getLastRow(), lastColumNum + 1));
    } else {
      templateSheet.getRange(1, 2).copyTo(sheet.getRange(2, lastColumNum + 1, sheet.getLastRow(), lastColumNum + 1));
    }
    templateSheet.getRange(1, 1).copyTo(sheet.getRange(1, lastColumNum + 1));
    sheet.getRange(1, lastColumNum + 1).setValue(getDate(date));
  }

  hideOverDateColumn(criteria: WorkScheduleCriteria): number {
    const sheet = this.getScheduleSheet();

    if (!sheet) return 0;

    const dateValues= this.getDateHeaderValue(sheet);
    const todayIndex = dateValues.findIndex((value) => {
      return getDate(criteria.date) === getDate(new Date(value))
    }) + 5;

    for(let i = 4; i < todayIndex; i++) {
      sheet.hideColumns(i);
    }

    return todayIndex - 4;
  }

  search(criteria: WorkScheduleCriteria): WorkSchedule[] {
    const sheet = this.getScheduleSheet();

    if (!sheet) return [];

    const dateValues= this.getDateHeaderValue(sheet);
    const todayIndex = dateValues.findIndex((value) => {
      return getDate(criteria.date) === getDate(new Date(value))
    }) + 4;

    const results = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();

    return this.translator.translateObjetsToResultList(results, todayIndex);
  }

  private getScheduleSheet(): GoogleAppsScript.Spreadsheet.Sheet | undefined {
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadSheet.getSheets().find((sheet) => {
      return sheet.getSheetName() === 'スケジュール';
    });
    return sheet;
  }

  private getTemplateScheduleSheet(): GoogleAppsScript.Spreadsheet.Sheet | undefined {
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadSheet.getSheets().find((sheet) => {
      return sheet.getSheetName() === 'テンプレート';
    });
    return sheet;
  }

  private getDateHeaderValue(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    return sheet.getRange(1, 5, 1, sheet.getLastRow()).getValues()[0];
  }
}