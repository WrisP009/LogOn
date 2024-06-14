// sweetalert.service.ts
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showConfirmationDialog(): Promise<boolean> {
    return Swal.fire({
      title: "¿Seguro que quieres realizar esta acción?",
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  showSuccessAlert(message: string): void {
    Swal.fire({
      title: 'Éxito!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  showErrorAlert(message: string): void {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}
