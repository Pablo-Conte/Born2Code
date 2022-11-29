type userDataDTO = {
  birthDate: Date;
};

interface IDayjsDateProvider {
  dateNow({ birthDate }: userDataDTO): Date;
  convertToUTC(date: Date): string;
}

export { IDayjsDateProvider, userDataDTO };
