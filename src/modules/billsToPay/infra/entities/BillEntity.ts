import { Bill } from "@prisma/client";

class BillEntity implements Bill {
  readonly id: string;
  valor: number;
  payied: boolean;
  userId: string;
}

export { BillEntity };