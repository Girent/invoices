const express = require("express");
const {
  getById,
  getTransactionsByDate,
} = require("../controllers/getWalletAmount");
const {
  accrueFunds,
  takeFunds,
  transferFunds,
} = require("../controllers/walletOperations");
const router = express.Router();

router.get("/wallet", getById);
router.post("/accrue", accrueFunds);
router.post("/take", takeFunds);
router.post("/transfer", transferFunds);

module.exports = router;
