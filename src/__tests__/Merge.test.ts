import Merge from "../common/Merge";

test("Merge", async () => {
  const a1 = [{ id: "1", value: "1" }, { id: "2", value: "2" }];
  const a2 = [{ id: "2", value: "3" }];

  expect(Merge.byKey(a1, a2, "id")).toStrictEqual([
    {
      id: "1",
      value: "1"
    },
    { id: "2", value: "3" }
  ]);
});
