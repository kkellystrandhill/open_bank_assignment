import axios from "axios";

export default async ({ reqBody, reqHeader: { location } }) => {
  const foundBranches = [];
  try {
    let branches, branchPostalAddress, townName, countrySubDivision;
    const HTTPS_URL = "https://api.lloydsbank.com/open-banking/v2.2/branches";
    try {
      const response = await axios.get(HTTPS_URL);
      branches = (await response?.data?.data[0]?.Brand[0]?.Branch) || [];
    } catch (error) {
      error.message = "HTTP_FAILURE";
      error.message.err = `Get from ${HTTPS_URL} failed.`;
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
      error.message = "LOOP_FAILURE";
      error.message.err = `Looping data from ${HTTPS_URL} failed.`;
      throw Error(error);
    }
  } catch (error) {
    error.message = "GET_BRANCHES_FAILURE";
    error.message.err = `Getting branch data for locaton ${location} from ${HTTPS_URL} failed.`;
    throw Error(error);
  }
  return foundBranches;
};
