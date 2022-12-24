import { EmphasisBookRepository } from "../infra/repositories/EmphasisBookRepository";

class CreateEmphasisBookUseCase {
  async execute({ bookId }): Promise<void> {
    const emphasisBookRepository = new EmphasisBookRepository();

    await emphasisBookRepository.create({ bookId });
  }
}

export { CreateEmphasisBookUseCase };
