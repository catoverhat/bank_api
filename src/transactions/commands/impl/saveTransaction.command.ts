import { Transactions } from "src/transactions/entities/transactions.entity";

export class SaveTransactionCommand {
  constructor(public readonly transactions: Partial<Transactions>) {}
}
