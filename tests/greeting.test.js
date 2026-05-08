import { greeting } from "../src/greeting";

test("greeting value", () => {
  expect(greeting).toBe("Hello, Odinite!");
});
