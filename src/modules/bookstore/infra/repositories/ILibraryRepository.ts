import { BookEntity } from "../../../books/infra/entities/BookEntity"
import { CreateBookDTO, DataToUpdateDTO, FindByIdDTO, DeleteLibraryDTO, FindByNameDTO, ReadAllBooksDTO } from "../../@types"
import { LibraryEntity } from "../entities/LibraryEntity"

interface ILibraryRepository {
  create({ nameLibrary, email }: CreateBookDTO): Promise<LibraryEntity>

  update({ data, libraryId }: DataToUpdateDTO): Promise<LibraryEntity>

  findById({ libraryId }: FindByIdDTO): Promise<LibraryEntity>

  delete({ libraryId }: DeleteLibraryDTO): Promise<void>

  findByName({ name }: FindByNameDTO): Promise<LibraryEntity>

  readAllBooks({ queryLibrary }: ReadAllBooksDTO): Promise<BookEntity[]>
}

export { ILibraryRepository };