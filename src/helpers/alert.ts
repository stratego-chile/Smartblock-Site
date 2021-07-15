import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

type AlertContent = {
  title?: string;
  text?: string;
  innerHTML?: string;
  mode?: 'popup' | 'toast';
}

type AlertContext = SweetAlertIcon;

export class Alert {
  private static async create(content: AlertContent, context: AlertContext): Promise<SweetAlertResult<unknown>> {
    return await Swal.fire({
      icon: context,
      title: content.title,
      text: content.text,
      html: content.innerHTML,
      toast: content.mode === 'toast',
      showDenyButton: context === 'question',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Cancelar',
    });
  }

  public static async info(content: AlertContent): Promise<SweetAlertResult<unknown>> {
    return await Alert.create(content, 'info');
  }

  public static async warn(content: AlertContent): Promise<SweetAlertResult<unknown>> {
    return await Alert.create(content, 'warning');
  }

  public static async success(content: AlertContent): Promise<SweetAlertResult<unknown>> {
    return await Alert.create(content, 'success');
  }

  public static async error(content: AlertContent): Promise<SweetAlertResult<unknown>> {
    return await Alert.create(content, 'error');
  }

  public static async question(content: AlertContent): Promise<SweetAlertResult<unknown>> {
    return await Alert.create(content, 'question');
  }
}
