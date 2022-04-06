import axios from "axios";

export default async ({ reqBody, reqHeader: { location } }) => {
  const foundBranches = [];
  try {
    let branches, branchPostalAddress, townName, countrySubDivision;

    try {
      const response = await axios.get(
        "https://api.lloydsbank.com/open-banking/v2.2/branches"
      );
      branches = (await response?.data?.data[0]?.Brand[0]?.Branch) || [];
    } catch (error) {
      throw Error(error);
    }
    try {
      for (const branch of branches) {
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
          for (const subDivision of countrySubDivision) {
            if (subDivision.toLowerCase().trim() === location) {
              foundBranches.push(branch);
              break;
            }
          }
        }
      }
    } catch (error) {
      throw Error(error);
    }
  } catch (error) {
    throw Error(error);
  }
  return foundBranches;
};
