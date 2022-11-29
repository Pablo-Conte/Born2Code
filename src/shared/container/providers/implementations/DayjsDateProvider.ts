import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDayjsDateProvider, userDataDTO } from "../IDayjsDateProvider";
dayjs.extend(utc);

class DayjsDateProvider implements IDayjsDateProvider {
  dateNow({ birthDate }: userDataDTO): Date {
    return dayjs(birthDate).toDate();
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
}

export { DayjsDateProvider };
