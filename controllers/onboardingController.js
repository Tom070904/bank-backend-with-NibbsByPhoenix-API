import User from "../models/User.js";
import { validateBVN, validateNIN } from "../services/kycService.js";

export const verifyKYC = async (req, res) => {
  try {
    const { kycType, kycId } = req.body;

    if (!kycId) {
      return res.status(400).json({
        message: "KYC ID is required",
      });
    }

    let response;

    // ✅ Only use kycType internally
    if (kycType === "bvn") {
      response = await validateBVN(kycId);
      console.log('bvn res', response);
      if (!response.success) {
        return res.status(400).json({
        message: "KYC validation failed",
      });}
      
    } else if (kycType === "nin") {
      response = await validateNIN(kycId);
      console.log('nin res', response);
      if (!response.response) {
        return res.status(400).json({
        message: "KYC validation failed",
      });}
    } else {
      return res.status(400).json({
        message: "Invalid KYC type (bvn or nin)",
      });
    }
      
    /* if (!response.success || !response.response) {
      return res.status(400).json({
        message: "KYC validation failed",
      });
      
    } */
    console.log(response);

    const user = await User.findById(req.user._id);

    user.kycType = kycType;
    user.kycId = kycId;
    user.kycVerified = true;

    await user.save();

    res.json({
      message: "KYC verified successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* export const verifyKYC = async (req, res) => {
  try {
    const { bvn, nin } = req.body;

    if (!["bvn", "nin"].includes(kycType)) {
      return res.status(400).json({ message: "Invalid KYC type" });
    }
    console.log('Received KYC verification request: ', { kycType, kycId });
    let response;

    if (kycType === "bvn") {
      response = await validateBVN(kycId);
    } else {
      response = await validateNIN(kycId);
    }

    if (!response.valid) {
      return res.status(400).json({ message: "KYC validation failed" });
      console.log('KYC validation failed: ', response);
    }

    const user = await User.findById(req.user._id);

    user.kycType = kycType;
    user.kycId = kycId;
    user.kycVerified = true;
    

    await user.save();

    res.json({
      message: "KYC verified successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; */