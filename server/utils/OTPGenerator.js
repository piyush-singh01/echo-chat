import otpGenerator from "otp-generator";

export default class OTP {
  constructor() {
    this.otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    this.OTPGenerationTime = Date.now();
    this.OTPExpiryTime = this.OTPGenerationTime + 10 * 60 * 1000;
  }

  get expiryTime() {
    return this.OTPExpiryTime;
  }

  get generationTime() {
    return this.generationTime;
  }

  isExpired() {
    return Date.now() > this.OTPExpiryTime;
  }
}
