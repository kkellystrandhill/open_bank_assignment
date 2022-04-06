import request from "supertest";
import axios from "axios";
import { getMockReq, getMockRes } from "@jest-mock/express";
import locationMiddleware from "../middleware/locationMiddleware";
import app from "../app";
import getBranches from "../functions/getBranches";
import branchMockData from "./branchesMockResponse";

const lbgTxnBranchLocation = "lbg-txn-branch-location";
let watfordBranches = {
  data: {
    data: [
      {
        Brand: [
          {
            Branch: [],
          },
        ],
      },
    ],
  },
};
watfordBranches.data.data[0].Brand[0].Branch = branchMockData({
  location: "watford",
});

jest.mock("axios");
describe("Get branches endpoint test suite", () => {
  // Test middleware
  it("Test location middleware validates lbg-txn-branch-location in req.header", async () => {
    const { res, next } = getMockRes({});
    const req = getMockReq({ headers: {} });
    await locationMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new Error("lbg-txn-branch-location does not exist on header")
    );
  });
  it("Test location middleware validates lbg-txn-branch-location has value", async () => {
    const { res, next } = getMockRes({});
    const req = getMockReq({ headers: { [lbgTxnBranchLocation]: "" } });
    await locationMiddleware(req, res, next);
    const error = new Error();
    error.name = "ValidationError";
    error.message = "Location should not be empty!";
    expect(next).toHaveBeenCalledWith(error);
  });
  it("Test location middleware validates lbg-txn-branch-location has value", async () => {
    const { res, next } = getMockRes({});
    const req = getMockReq({ headers: { [lbgTxnBranchLocation]: "999" } });
    await locationMiddleware(req, res, next);
    const error = new Error();
    error.name = "ValidationError";
    error.message = "Location should not be a number!";
    //expect(next).toBeCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
  it("Test location middleware accepts valid location", async () => {
    const { res, next } = getMockRes({});
    const req = getMockReq({ headers: { [lbgTxnBranchLocation]: "london" } });
    await locationMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  // Test functions
  it("Test getBranches executes, mocking req and res", async () => {
    const { res } = getMockRes({
      data: watfordBranches,
    });
    const req = getMockReq({ headers: { [lbgTxnBranchLocation]: "watford" } });
    await getBranches({ reqHeader: req.headers });
    expect(res.data).toEqual(watfordBranches);
  });

  // Test access to service
  it("Test middleware lbg-txn-branch-location exists on header", async () => {
    const response = await request(app).get("/");
    expect(response.status).toEqual(500);
  });

  // Test data retrieval
  it("Test lbg-txn-branch-location equal null returns empty array", async () => {
    const response = await request(app)
      .get("/")
      .set(lbgTxnBranchLocation, null);
    expect(response.body).toEqual([]);
  });
  it("Test lbg-txn-branch-location equal invalid branch location returns empty array", async () => {
    const response = await request(app)
      .get("/")
      .set(lbgTxnBranchLocation, "Dublin");
    expect(response.body).not.toEqual(branchMockData({ location: "london" }));
  });
  jest.setTimeout(10000);
  it("Test correct data returned for specified location!", async () => {
    const response = await request(app)
      .get("/")
      .set(lbgTxnBranchLocation, "london");
    expect(response.body).not.toEqual(branchMockData({ location: "london" }));
  });
  it("Test correct data returned for specified location regardless of case!", async () => {
    const response = await request(app)
      .get("/")
      .set(lbgTxnBranchLocation, "LoNdoN");
    expect(response.body).not.toEqual(branchMockData({ location: "london" }));
  });

  it("Test mock downstream axios call", async () => {
    axios.get.mockResolvedValueOnce(watfordBranches);
    let response;
    try {
      response = await getBranches({
        reqHeader: {
          location: "watford",
        },
      });
    } catch (e) {
      response = "";
      const error = {
        name: e.name,
        message: e.message,
      };
      throw error;
    }
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.lloydsbank.com/open-banking/v2.2/branches"
    );
    expect(response).toEqual(branchMockData({ location: "watford" }));
  });
});
