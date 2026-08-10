import { Decimal } from "decimal.js";

export class CurrencyUtils {
    static centsToDollarsText(cents: number): string {
        return new Decimal(cents).dividedBy(100).toFixed(2);
    }

    static dollarsTextToCents(text: string): number {
        try {
            return new Decimal(text).times(100).round().toNumber();
        } catch {
            return 0;
        }
    }
}
