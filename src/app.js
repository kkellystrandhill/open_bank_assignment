import express from "express";
import axios from "axios";
import locationMiddleware from "./middleware/locationMiddleware.js";

const app = express();
app.use(locationMiddleware);

app.get("/", async (req, res) => {
  const foundBranches = getBranches(req);
  return res.send(foundBranches);
});

export const getBranches = async (req, _) => {
  let location,
    branchPostalAddress,
    townName,
    countrySubDivision,
    foundBranches = [];

  if (req?.headers["lbg-txn-branch-location"]) {
    location = req.headers["lbg-txn-branch-location"].toLowerCase().trim();
  }

  if (location) {
    const response = await axios.get(
      "https://api.lloydsbank.com/open-banking/v2.2/branches"
    );
    let branches = (await response?.data?.data[0]?.Brand[0]?.Branch) || [];

    for (let branch of branches) {
      branchPostalAddress = branch.PostalAddress;
      townName = branchPostalAddress?.TownName
        ? branchPostalAddress.TownName.toLowerCase().trim()
        : "";
      if (townName === location) {
        foundBranches.push(branch);
        continue;
      }
      countrySubDivision = branchPostalAddress?.CountrySubDivision;
      if (Array.isArray(countrySubDivision)) {
        for (let subDivision of countrySubDivision) {
          if (subDivision.toLowerCase().trim() === location) {
            foundBranches.push(branch);
            break;
          }
        }
      }
    }
  }
  return foundBranches;
};

export default app;
