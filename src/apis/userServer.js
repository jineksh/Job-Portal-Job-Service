import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();

export async function getUserById(userId) {
  const USER_SERVICE_URL = process.env.USER_SERVICE_URL// user service ka port

  const response = await axios.get(
    `${USER_SERVICE_URL}/user/${userId}`
  );

  console.log(response.data);

  return response.data;
}

