import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDayjsDateProvider } from "../IDayjsDateProvider";
dayjs.extend(utc);

class DayjsDateProvider implements IDayjsDateProvider {
  dateNow(userData): Date {
    return dayjs(userData).toDate();
  }
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
}

export { DayjsDateProvider };
