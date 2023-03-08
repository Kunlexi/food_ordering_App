/* ------------------- Email --------------------- */

/* ------------------- Notification --------------------- */

/* ------------------- OTP --------------------- */

export const GenerateOtp = () => {
  const otp = Math.floor(10000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
  try {
    const accountSid = "ACa029a5d69c0121babe179aae7c0ef807";
    const authToken = "95afcf8caf32437abfdd8f60e760816b";
    const client = require("twilio")(accountSid, authToken);

    const response = await client.message.create({
      body: `Your OTP is ${otp}`,
      from: "+15075954479",
      to: `+234${toPhoneNumber}`, // recipient phone number // Add country before the number
    });

    return response;
  } catch (error) {
    return false;
  }
};

/* ------------------- Payment --------------------- */
