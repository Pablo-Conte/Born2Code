import { AddTotalRentsOnEmphasisBookUseCaseDTO } from "../@types";
import { EmphasisBookRepository } from "../infra/repositories/implementations/EmphasisBookRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class AddTotalRentsOnEmphasisBookUseCase {
  constructor(
    @inject("EmphasisBookRepository")
    private emphasisBookRepository: EmphasisBookRepository
  ){}
  async execute({
    bookId,
  }: AddTotalRentsOnEmphasisBookUseCaseDTO): Promise<void> {

    await this.emphasisBookRepository.updateTotalRents({ bookId });
  }
}

export { AddTotalRentsOnEmphasisBookUseCase };
