// import Swal from "sweetalert2";
import { AppSwal } from "../AppSwal";

export const AppToast = () =>
  AppSwal().mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      container: "sweet-alert-toast-height",
    },
    timerProgressBar: true,
    showCloseButton: true,
    // didOpen: (toast) => {
    // toast.addEventListener("mouseenter", Swal.);
    // toast.addEventListener("mouseleave", Swal.resumeTimer);
    // },
  });
