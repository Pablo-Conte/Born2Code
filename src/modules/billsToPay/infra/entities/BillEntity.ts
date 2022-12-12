import { Bill } from "@prisma/client";

class BillEntity implements Bill {
  id: string;
  valor: number;
  payied: boolean;
  userId: string;
}

export { BillEntity };
