import swaggerJson from "./../swagger.json";
import fetch from "node-fetch";
import { checkIsEmailPaylivre } from "../models/CheckIsEmailPaylivre";

async function validateToken(access_token) {
  try {
    const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${access_token}`;
    const response = await fetch(url);
    const { email, expires_in } = await response.json();
    const isValidEmail = checkIsEmailPaylivre(email);
    const isNotExpires = expires_in > 0;
    if (isValidEmail && isNotExpires) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
}

class ApiDocController {
  async index(request, response) {
    try {
      const { access_token } = request.query;
      const isValid = await validateToken(access_token);
      if (isValid) {
        await response.status(200).send(swaggerJson);
      } else {
        await response.status(401).send({ error: "not authorized" });
      }
    } catch (error) {
      await response.status(500).send({ error: "unexpected error" });
    }
  }
}

export default ApiDocController;
