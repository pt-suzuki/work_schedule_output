export interface WorkSchedule {
  name: string;
  date?: Date;
  email: string;
  team: string;
  slackName: string;
  type: string;
  isHoliday: boolean;
}