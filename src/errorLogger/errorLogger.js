export default ({ error: error }) => {
  try {
    console.log(`Error name: ${error.name}, Error message: ${error.message}`);
  } catch (e) {
    console.log(`Error logger error = `, e);
    throw Error(e);
  }
};
