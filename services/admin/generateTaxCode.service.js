const TaxCodes = require("../../models/taxCodes.model");
const ErrorResponse = require("../../utils/errorResponse");

const generateTaxCode = async (req, next) => {
  try {
    const newtaxCode = await TaxCodes.create();
    console.log(newtaxCode);
    return newtaxCode.dataValues;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = generateTaxCode;
