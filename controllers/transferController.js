import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import {
  nameEnquiry,
  transferFunds,
  getTransactionStatus,
} from "../services/transferService.js";

export const sendMoney = async (req, res) => {
  try {
    const { to, amount, accountName } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await User.findById(req.user._id);

    if (!user.accountNumber) {
      return res.status(400).json({
        message: "Create account first",
      });
    }

    if (to === user.accountNumber) {
      return res.status(400).json({
        message: "Cannot send to yourself",
      });
    }

   
    const enquiry = await nameEnquiry(to);

 
    /* if (accountName !== enquiry.accountName) {
      return res.status(400).json({
        message: "Account name mismatch. Please verify again.",
      });
    } */

    const transfer = await transferFunds({
      from: user.accountNumber,
      to,
      amount,
    });

    const tx = await Transaction.create({
      userId: user._id,
      from: user.accountNumber,
      to,
      amount,
      transactionId: transfer.transactionId,
      status: transfer.status,
    });

    res.json({
      message: "Transfer successful",
      recipient: enquiry.accountName,
      transaction: tx,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const verifyAccount = async (req, res) => {
  try {
    const { accountNumber } = req.body;

    if (!accountNumber) {
      return res.status(400).json({
        message: "Account number is required",
      });
    }

    const enquiry = await nameEnquiry(accountNumber);

    res.json({
      accountNumber: enquiry.accountNumber,
      accountName: enquiry.accountName,
      bankName: enquiry.bankName,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const checkTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const status = await getTransactionStatus(id);

    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};