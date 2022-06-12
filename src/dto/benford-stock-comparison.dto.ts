import { ApiProperty } from "@nestjs/swagger";

export class BenfordStockComparisonDto {
    @ApiProperty()
    leadingDigit: number;

    @ApiProperty()
    occurenceCount: number;

    @ApiProperty()
    occurencePercent: string;

    @ApiProperty()
    comparisonToBL: string;
}
