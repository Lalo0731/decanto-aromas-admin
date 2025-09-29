import Swal from "sweetalert2";

export const showSuccess = (message: string, title = "Éxito") => {
  Swal.fire({
    title,
    text: message,
    icon: "success",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#3085d6",
  });
};

export const showError = (message: string, title = "Error") => {
  Swal.fire({
    title,
    text: message,
    icon: "error",
    confirmButtonText: "Intentar de nuevo",
    confirmButtonColor: "#d33",
  });
};

export const showWarning = (message: string, title = "Advertencia") => {
  Swal.fire({
    title,
    text: message,
    icon: "warning",
    confirmButtonText: "Entendido",
    confirmButtonColor: "#f1c40f",
  });
};

export const showInfo = (message: string, title = "Información") => {
  Swal.fire({
    title,
    text: message,
    icon: "info",
    confirmButtonText: "Ok",
    confirmButtonColor: "#3498db",
  });
};


export const showSuccessExecute = (
    message: string,
    title = "Éxito",
    callback?: () => void
  ) => {
    Swal.fire({
      title,
      text: message,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      if (callback) callback();
    });
  };

  export const showConfirmDelete = async (
    itemName: string
  ): Promise<boolean> => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `El perfume "${itemName}" se eliminará permanentemente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
  
    return result.isConfirmed;
  };