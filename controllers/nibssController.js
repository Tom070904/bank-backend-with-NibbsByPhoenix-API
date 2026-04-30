import { onboardFintech } from "../services/nibssOnboarding.js";
import { loginFintech } from "../services/nibssOnboarding.js";

export const initFintech = async (req, res) => {
  try {
    const onboard = await onboardFintech();
    const token = await loginFintech();

    res.json({
      message: "Fintech initialized",
      onboard,
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};