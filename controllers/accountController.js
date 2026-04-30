import User from "../models/User.js";
import { createAccountNIBSS } from "../services/accountService.js";
import { getBalanceNIBSS } from "../services/accountService.js";

export const createAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    
    if (!user.kycVerified) {
      return res.status(400).json({
        message: "Complete KYC verification first",
      });
    }

    
    if (user.accountNumber) {
      return res.status(400).json({
        message: "User already has an account",
      });
    }
    console.log('Creating account for user: ', user.email);
    // Call NIBSS
    const response = await createAccountNIBSS({
      kycType: user.kycType,
      kycID: user.kycId,
      dob: user.dob,
    });
    console.log('NIBSS response: ', response);
    // Save account number
    user.accountNumber = response.account.accountNumber;
    await user.save();

    res.status(201).json({
      message: "Account created successfully",
      account: {
        accountNumber: response.account.accountNumber,
        bankCode: response.account.bankcode,
        balance: response.account.balance,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.accountNumber) {
      return res.status(400).json({
        message: "No account found",
      });
    }

    const balance = await getBalanceNIBSS(user.accountNumber);

    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};