import StockMarket from "../common/StockMarket";

test("Stock Market", async () => {
  Date.now = () => new Date(2018, 4, 28, 10, 0, 0).getTime();

  expect(StockMarket.isTransactionTime()).toBe(true);
});
