import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";
import { DiscountEntity } from "@modules/books/infra/entities/DiscountEntity";
import { IBooksRepository } from "@modules/books/infra/repositories/IBooksRepository";
import { BooksRepository } from "@modules/books/infra/repositories/implementations/BooksRepository";
import { DiscountRepository } from "@modules/books/infra/repositories/implementations/DiscountRepository";
import { inject, injectable } from "tsyringe";

type DiscountDTO = {
  userId: string;
  bookId: string;
  percentage: number;
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

  async execute({ userId, bookId, percentage }: DiscountDTO) {
    const userFound = await this.usersRepository.findById({ userId });
    //depois validar admin

    const bookFound = await this.booksRepository.findById({ id: bookId });
    //depois validar se existe

    const newDiscount = await this.discountRepository.createDiscount({
      bookId,
      percentage,
    });
  }
}

export { DiscountBookUseCase };
