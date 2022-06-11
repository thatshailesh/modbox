import { StockHistoricalDataDto } from "./stock-historical-data.dto";

export class StockHistoricalDataApiDto {
    prices: StockHistoricalDataDto[]
    isPending: boolean;
    id: string;
    firstTradeDate: number;
}
