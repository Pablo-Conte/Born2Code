import { HistoryRent } from "@prisma/client"

class HistoryRentEntity implements HistoryRent {
    
    readonly id: string;
    libraryid: string;
    bookId: string;
    clienteId: string;
    startDate: Date;
    endDate: Date;
    totalValue: string;
}

export { HistoryRentEntity };