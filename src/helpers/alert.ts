import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
import { Smartblock } from 'types';
export class Alert {
  private static async create(content: Smartblock.Types.AlertContent, context: SweetAlertIcon): Promise<SweetAlertResult<unknown>> {
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

  public static async info(content: Smartblock.Types.AlertContent): Promise<SweetAlertResult<unknown>> {
    return await Alert.create(content, 'info');
  }

  public static async warn(content: Smartblock.Types.AlertContent): Promise<SweetAlertResult<unknown>> {
    return await Alert.create(content, 'warning');
  }

  public static async success(content: Smartblock.Types.AlertContent): Promise<SweetAlertResult<unknown>> {
    return await Alert.create(content, 'success');
  }

  public static async error(content: Smartblock.Types.AlertContent): Promise<SweetAlertResult<unknown>> {
    return await Alert.create(content, 'error');
  }

  public static async question(content: Smartblock.Types.AlertContent): Promise<SweetAlertResult<unknown>> {
    return await Alert.create(content, 'question');
  }
}
