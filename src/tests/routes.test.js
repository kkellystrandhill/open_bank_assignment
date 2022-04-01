import app from "../app";
import request from "supertest";

describe("Test basic server GET /", () => {
  test("It should respond with Hello World!", async () => {
    const response = await request(app).get("/");
    expect(response.body).toEqual({ message: "Hello World!" });
    expect(response.statusCode).toBe(200);
  });
});
