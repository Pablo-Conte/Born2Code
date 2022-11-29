interface IDayjsDateProvider {
  dateNow(userData): Date;
  convertToUTC(date: Date): string;
}

export { IDayjsDateProvider };
