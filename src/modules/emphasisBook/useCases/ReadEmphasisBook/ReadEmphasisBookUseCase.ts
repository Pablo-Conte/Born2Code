import { EmphasisBookEntity } from "../../infra/entities/EmphasisBookEntity";
import { EmphasisBookRepository } from "../../infra/repositories/implementations/EmphasisBookRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ReadEmphasisBookUseCase {
  constructor(
    @inject("EmphasisBookRepository")
    private emphasisBookRepository: EmphasisBookRepository
  ){}
  async execute(): Promise<EmphasisBookEntity[]> {

    const emphasisBook = await this.emphasisBookRepository.readAllEmphasisBooks();

    return emphasisBook;
  }
}

export { ReadEmphasisBookUseCase };
