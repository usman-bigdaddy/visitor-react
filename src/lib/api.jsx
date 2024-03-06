import { API_URL } from "./config";
import axios, { AxiosError } from "axios";

export const createUser = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/users/register`,
      formData
    );
  } catch (error) {
    console.error("Failed to fetch current user:", error);
  }
};

export const getResidents = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/v1/users/getresidents`);
    return data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
  }
};
export const getInvites = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/v1/invites`);
    return data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
  }
};
export const getResidentsInvites = async (creator) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/api/v1/invites/mine/${creator}`
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
  }
};

export const getSecurities = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/v1/users/getsecurities`);
    return data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
  }
};

export const updateSecurityStatus = async (user, onDuty) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/users/updatesecuritystatus`,
      { user, onDuty }
    );
    return response;
  } catch (error) {
    console.error("Failed to update current secuirty:", error);
  }
};

export const getDashbaord = async (user, onDuty) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/dash/`);
    return response;
  } catch (error) {
    console.error("Failed to update current secuirty:", error);
  }
};

export const verifyInvite = async (code) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/invites/verify/${code}`
    );
    return response;
  } catch (error) {
    console.error("Failed to update current secuirty:", error);
  }
};

export const updateInvitationCode = async (code, status) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/invites/${code}/${status}`
    );
    return response;
  } catch (error) {
    console.error("Failed to update current secuirty:", error);
  }
};
