import getBranches from "../functions/getBranches.js";

export default async (req, res, next) => {
  try {
    const response = await getBranches({
      reqBody: {
        body: req.body,
      },
      reqHeader: {
        location: req.headers["lbg-txn-branch-location"],
      },
    });
    res.json(response);
  } catch (e) {
    next(e);
  }
};
