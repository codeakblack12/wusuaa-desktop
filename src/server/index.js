import axios from "axios";
// export const WUSUAA_API = "https://ebc7-102-219-153-213.ngrok-free.app/";
// export const WUSUAA_API = "https://api.wusuaafrozenfoods.com/";
export const WUSUAA_API = "https://staging.wusuaafrozenfoods.com/";
// export const WUSUAA_SOCKET_API = "https://api.wusuaafrozenfoods.com";

export const doPost = async (url, payload) => {
  const response = await axios.post(WUSUAA_API + url, payload, {
    headers: {
      'Authorization': "None",
      Accept: "Application/json",
      'Content-Type': "Application/json",
      "Charset": "UTF-8"
    },
  });
  console.log(response)
  return response.data
};

export const getRequest = async (url) => {

    const token = await localStorage.getItem("USER_TOKEN");

    const authorize = token ? `Bearer ${token}` : 'None'

    const response = await axios.get(WUSUAA_API + url, {
        headers: {
          authorization: authorize,
          'Content-Type': 'application/json',
          "Charset": "UTF-8"
        },
        timeout: 15000
    })
    return response.data
}

export const sendPost = async ( url, payload ) => {

    const token = await localStorage.getItem("USER_TOKEN");

    var response = await axios.post(WUSUAA_API + url, payload, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          "Charset": "UTF-8"
        },
    });

    return response
};

export const sendPut = async ( url, payload ) => {

  const token = await localStorage.getItem("USER_TOKEN");

  var response = await axios.put(WUSUAA_API + url, payload, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        "Charset": "UTF-8"
      },
  });

  return response
};

export const sendDelete = async ( url, payload ) => {

  const token = await localStorage.getItem("USER_TOKEN");

  var response = await axios.delete(WUSUAA_API + url, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        "Charset": "UTF-8"
      },
  });

  return response
};

export default {doPost, getRequest, sendPost}