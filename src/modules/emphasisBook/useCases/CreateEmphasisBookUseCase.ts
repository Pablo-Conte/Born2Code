import { EmphasisBookRepository } from "../infra/repositories/implementations/EmphasisBookRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateEmphasisBookUseCase {
  constructor(
    @inject("EmphasisBookRepository")
    private emphasisBookRepository: EmphasisBookRepository
  ){}
  async execute({ bookId }): Promise<void> {

    await this.emphasisBookRepository.create({ bookId });
  }
}

export { CreateEmphasisBookUseCase };
