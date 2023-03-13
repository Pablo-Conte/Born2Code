import { FindByIdDTO, CreateDTO, AddTotalRentsOnEmphasisBookUseCaseDTO } from "../../@types"
import { EmphasisBookEntity } from "../entities/EmphasisBookEntity"

interface IEmphasisBookRepository{
  FindById({ bookId }: FindByIdDTO): Promise<EmphasisBookEntity> 

  create({ bookId }: CreateDTO): Promise<void> 

  updateTotalRents({
    bookId,
  }: AddTotalRentsOnEmphasisBookUseCaseDTO): Promise<void>

  readAllEmphasisBooks(): Promise<EmphasisBookEntity[]>
}

export { IEmphasisBookRepository }