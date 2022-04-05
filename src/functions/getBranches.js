import axios from "axios";
import errorLogger from "../errorLogger/errorLogger.js";

export default async ({ req: req }) => {
  let location,
    locationHeader = "lbg-txn-branch-location",
    foundBranches = [];
  try {
    location = req.headers[locationHeader];

    let branches, branchPostalAddress, townName, countrySubDivision;

    try {
      const response = await axios.get(
        "https://api.lloydsbank.com/open-banking/v2.2/branches"
      );
      branches = (await response?.data?.data[0]?.Brand[0]?.Branch) || [];
    } catch (error) {
      errorLogger({ error });
      throw Error(error);
    }
    try {
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
    } catch (error) {
      errorLogger({ error });
      throw Error(error);
    }
  } catch (error) {
    errorLogger({ error });
    throw Error(error);
  }
  return foundBranches;
};
