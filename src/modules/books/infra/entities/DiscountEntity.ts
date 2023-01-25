import { Discount } from "@prisma/client";

class DiscountEntity implements Discount {
  readonly id: string;

  percentage: number;
  bookId: string;
  newValue: string;
  startDate: Date;
  endDate: Date;
}

export { DiscountEntity };
