import { AddTotalRentsOnEmphasisBookUseCaseDTO } from "../@types";
import { EmphasisBookRepository } from "../infra/repositories/EmphasisBookRepository";

class AddTotalRentsOnEmphasisBookUseCase {
  async execute({
    bookId,
  }: AddTotalRentsOnEmphasisBookUseCaseDTO): Promise<void> {
    const emphasisBookRepository = new EmphasisBookRepository();

    await emphasisBookRepository.updateTotalRents({ bookId });
  }
}

export { AddTotalRentsOnEmphasisBookUseCase };
