const saveUserToDB = require("../services/saveUserToDB.service");
const checkExistingUser = require("../services/checkExistingUser.service");
const getUser = require("../services/getUser.service");
const initiatePaymentService = require("../services/initiatePayment.service");
const verifyPaymentService = require("../services/verifyPayment.service");
const creditUser = require("../services/creditUser.service");
const getBalanceService = require("../services/getBalance.service");
const ninValidationService = require("../services/ninValidation.service");
const suspendedNinService = require("../services/suspendedNin.service");
const dataModificationService = require("../services/dataModification.service");
const getRequestHistoryService = require("../services/getRequestHistory.service");
const editRequestStatusService = require("../services/editRequestStatus.service");

const signUpHandler = async (req, res) => {
  try {
    // Check if user already exists
    const { phone } = req.body;
    const userExists = await checkExistingUser(phone);
    if (userExists) {
      res.status(400).json({
        message: `user already exists. User a new phone number.`,
      });
    }

    // save user if it does not exist
    const savedSuccessfully = await saveUserToDB(req.body);
    if (savedSuccessfully) {
      res.status(200).json({
        message: `user successfully registered`,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: `Error: failed to generate to register new user`,
    });
  }
};

const loginHandler = async (req, res) => {
  try {
    const userData = await getUser(req.body);
    if (userData === "user not found" || userData === "incorrect password") {
      res.status(400).json({
        message: `Wrong sign in credentials`,
      });
      return;
    }

    delete userData[0].password;
    res.status(200).json({
      message: `${JSON.stringify(userData[0])}`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error}`,
    });
  }
};

const initiatePayment = async (req, res) => {
  try {
    const { access_code, reference } = await initiatePaymentService(req.body);
    res.status(200).json({
      message: { access_code, reference },
    });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error}`,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const paymentStatus = await verifyPaymentService(req.body);
    if (paymentStatus) {
      const creditedSuccessfully = await creditUser(req.body);
      res.status(200).json({
        message: paymentStatus,
      });
    } else {
      res.status(400).json({
        message: paymentStatus,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error}`,
    });
  }
};

const getAccess = (req, res) => {
  try {
    const access = process.env.PAYSTACK_PK_TEST;
    res.status(200).json({
      message: access,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error}`,
    });
  }
};

const getBalance = async (req, res) => {
  const balance = await getBalanceService(req.query.phone);
  try {
    res.status(200).json({
      message: balance,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error}`,
    });
  }
};

const ninValidation = async (req, res) => {
  try {
    var requestSentSuccessfully = await ninValidationService(req.body);
    if (requestSentSuccessfully) {
      res.status(200).json({
        message: `request for ${req.body.service} successfully sent!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error}`,
    });
  }
};

const suspendedNin = async (req, res) => {
  try {
    var requestSentSuccessfully = await suspendedNinService(req.body);
    if (requestSentSuccessfully) {
      res.status(200).json({
        message: `request for ${req.body.service} successfully sent!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Message: ${error}`,
    });
  }
};

const dataModification = async (req, res) => {
  try {
    var requestSentSuccessfully = await dataModificationService(req.body);
    if (requestSentSuccessfully) {
      res.status(200).json({
        message: `request for ${req.body.service} successfully sent!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Message: ${error}`,
    });
  }
};

const getRequestHistory = async (req, res) => {
  try {
    var allRequests = await getRequestHistoryService(req.body);
    if (allRequests) {
      res.status(200).json({
        message: allRequests,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Message: ${error}`,
    });
  }
};

const editRequestStatus = async (req, res) => {
  try {
    var updateSuccess = await editRequestStatusService(req.params);
    if (updateSuccess) {
      res.status(200).json({
        message: `Successfully updated request status of ${req.params.id} to ${req.params.status}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Message: ${error}`,
    });
  }
};

const refreshHandler = (req, res) => {
  console.log("server has been refreshed!");
  res.json("server has been refreshed!");
};

module.exports = {
  signUpHandler,
  refreshHandler,
  loginHandler,
  initiatePayment,
  verifyPayment,
  getAccess,
  getBalance,
  ninValidation,
  suspendedNin,
  dataModification,
  getRequestHistory,
  editRequestStatus,
};
