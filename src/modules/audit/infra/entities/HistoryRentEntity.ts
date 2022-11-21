import { HistoryRent } from "@prisma/client";

class HistoryRentEntity implements HistoryRent {
  id: string;
  libraryid: string;
  bookId: string;
  clienteId: string;
  startDate: Date;
  endDate: Date;
  totalValue: string;
}

export { HistoryRentEntity };
