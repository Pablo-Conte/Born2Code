import { Discount } from "@prisma/client";

class DiscountEntity implements Discount {
  id: string;
  percentage: number;
  bookId: string;
  newValue: number;
  startDate: Date;
  endDate: Date;
}

export { DiscountEntity };
