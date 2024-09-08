import { Slide, toast } from "react-toastify";

export const toastError = (message: string) => {
  return toast.error(`${message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
  });
};

export const toastSuccess = (message: string) => {
  return toast.success(`${message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
  });
};

export const optionOneVals = ["automatic", "manual"];
export const statuses = ["all", "X", "Y"];
