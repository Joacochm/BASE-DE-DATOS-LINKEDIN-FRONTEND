import { toast } from 'react-toastify';

export function handleApiError(error) {
  if (!error.response) {
    toast.error("Error de red o servidor no disponible");
    return;
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      toast.error(data.message || "Solicitud inválida");
      break;
    case 401:
      toast.error("No autorizado. Por favor inicia sesión");
      break;
    case 403:
      toast.error("Acceso denegado");
      break;
    case 404:
      toast.error("Recurso no encontrado");
      break;
    case 500:
      toast.error("Error interno del servidor");
      break;
    default:
      toast.error(data.message || "Ocurrió un error inesperado");
      break;
  }
}
