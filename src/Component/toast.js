import { toast } from "react-toastify";

export const successToast = (message = "Request processed successfully!", position = "top-right") => {
  toast.success(`🚀${message}`, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const errorToast = (message = "Request failed, try again later!", position = "top-right") => {
  toast.error(`${message}`, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default {
  success: successToast,
  error: errorToast,
};
