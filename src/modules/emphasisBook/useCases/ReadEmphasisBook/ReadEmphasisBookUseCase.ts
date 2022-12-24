import { EmphasisBookEntity } from "../../infra/entities/EmphasisBookEntity";
import { EmphasisBookRepository } from "../../infra/repositories/EmphasisBookRepository";

class ReadEmphasisBookUseCase {
  async execute(): Promise<EmphasisBookEntity[]> {
    const emphasisBookRepository = new EmphasisBookRepository();

    const emphasisBook = await emphasisBookRepository.readAllEmphasisBooks();

    return emphasisBook;
  }
}

export { ReadEmphasisBookUseCase };
