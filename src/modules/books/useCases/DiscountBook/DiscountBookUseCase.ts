import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";
import { DiscountEntity } from "@modules/books/infra/entities/DiscountEntity";
import { IBooksRepository } from "@modules/books/infra/repositories/IBooksRepository";
import { BooksRepository } from "@modules/books/infra/repositories/implementations/BooksRepository";
import { DiscountRepository } from "@modules/books/infra/repositories/implementations/DiscountRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

type DiscountDTO = {
  userId: string;
  bookId: string;
  percentage: number;
  startDate: Date;
  endDate: Date;
};

@injectable()
class DiscountBookUseCase {
  constructor(
    @inject(BooksRepository)
    private booksRepository: IBooksRepository,
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
    @inject(DiscountRepository)
    private discountRepository: DiscountRepository
  ) {}

  async execute({
    userId,
    bookId,
    percentage,
    startDate,
    endDate,
  }: DiscountDTO) {
    const userFound = await this.usersRepository.findById({ userId });
    if (userFound.admin === false) throw new AppError("User is no admin!", 404);

    const bookFound = await this.booksRepository.findById({ id: bookId });
    if (!bookFound) throw new AppError("Book not found", 400);

    const newDiscount = await this.discountRepository.createDiscount({
      bookId,
      percentage,
      startDate,
      endDate,
    });

    return newDiscount;
  }
}

export { DiscountBookUseCase };
