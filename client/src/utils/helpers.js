import { toast } from "react-toastify";

export const getCookie = (cookieName) => {
  const cookieArray = document.cookie.split(";");

  for (const cookie of cookieArray) {
    let cookieString = cookie;

    while (cookieString.charAt(0) == " ") {
      cookieString = cookieString.substring(1, cookieString.length);
    }
    if (cookieString.indexOf(cookieName + "=") == 0) {
      return cookieString.substring(cookieName.length + 1, cookieString.length);
    }
  }

  return undefined;
};

export const handleResponse = async (response) => {
  const processing = toast.loading("Processing...");

  try {
    const res = await response;
    toast.done(processing);
    if (res.hasOwnProperty("error")) {
      throw new Error("Something went wrong");
    }
    toast.success("Success!");
    return res;
  } catch (error) {
    toast.error("Something went wrong");
    return error;
  }
};
