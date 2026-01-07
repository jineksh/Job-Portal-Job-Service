import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();

export async function getUserById(userId) {
  const USER_SERVICE_URL = process.env.USER_SERVICE_URL// user service ka port

  console.log(userId)

  const response = await axios.get(
    `${USER_SERVICE_URL}/${userId}`
  );

  console.log('From api Response',response.data.data);

  return response.data.data;
}

