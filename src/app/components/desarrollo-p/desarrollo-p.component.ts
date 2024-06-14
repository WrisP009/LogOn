import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesarrolloPService } from 'src/app/services/desarrollo-p.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';


@Component({
  selector: 'app-desarrollo-p',
  templateUrl: './desarrollo-p.component.html',
  styleUrls: ['./desarrollo-p.component.css']
})
export class DesarrolloPComponent implements OnInit {
  formPersona: FormGroup;
  accion = 'Agregar';
  id : number | undefined;
  listaPersona: any[] = [];

  public fileToUpload: Array<File>=[];

  constructor (private fb: FormBuilder,private _PersonaServices: DesarrolloPService, private sweetAlertService: SweetAlertService) { 
    this.formPersona = this.fb.group({
    PersonaId:['', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
    Nombre: ['',[Validators.required, Validators.maxLength(66), Validators.minLength(3)]],
    Apellido:['',[Validators.required, Validators.maxLength(65), Validators.minLength(3)]],
    CorreoElectronico:['',[Validators.required, Validators.maxLength(65), Validators.minLength(3)]],
  });
}

  ngOnInit(): void {
    this.obtenerpersona();
  }

  listaPersonas: any[] =[
    {PersonaId: '10', Nombre: 'Juan', Apellido: 'Perez', CorreoElectronico: 'juanprez@example.com'}
  ];

  editarPersona(persona: any) //traer la informacion al frm para editar
  {
    this.accion = 'Editar';
    this.id = persona.personaId;
    console.log("ID a editar ->", persona);

    // Obtenemos la persona por su ID desde el backend
    this._PersonaServices.getPersonaID(persona.personaId).subscribe(data => {
      // Actualizamos el formulario con los datos de la persona seleccionada
      this.formPersona.patchValue({
        PersonaId: data.personaId,
        Nombre: data.nombre,
        Apellido: data.apellido,
        CorreoElectronico: data.correoElectronico
      });
    }, error => {
      console.error("Error al obtener la persona", error);
    });

  }

  eliminarPersona(id: number) {
    this.sweetAlertService.showConfirmationDialog().then((result) => {
      if (result) {
        this._PersonaServices.deletePersona(id).subscribe(data => {
          this.sweetAlertService.showSuccessAlert('Persona eliminada correctamente.');
          this.obtenerpersona();
        }, error => {
          this.sweetAlertService.showErrorAlert('Error al eliminar la persona.');
          console.error("Error", error);
        });
      }
    });
  }

  AddPersona(){

    //console.log("Form -->", this.formPersona);

    const persona: any ={
      PersonaId : this.formPersona.get('PersonaId')?.value,
      Nombre: this.formPersona.get('Nombre')?.value,
      Apellido: this.formPersona.get('Apellido')?.value,
      CorreoElectronico: this.formPersona.get('CorreoElectronico')?.value,
    }

    console.log("persona -->", persona);

    if(this.id == undefined)
      {
        //add Tarjeta
        this._PersonaServices.savePersona(persona).subscribe(data =>{
          //this.toastr.success('se agrego la persona con exito', 'Correcto');
          this.formPersona.reset(); //limpiar frm
          this.obtenerpersona(); // refrescar la lista
          this.id = undefined;
          this.accion = 'Agregar';
          this.sweetAlertService.showSuccessAlert('Persona agregada correctamente.');
        }, error =>{ 
          this.sweetAlertService.showErrorAlert('Error al agregar la persona.');
          console.log ("Error ->", error);
        });
      } else {
        // Actualizar persona existente
        this._PersonaServices.putPersona(persona).subscribe(data => {
          this.formPersona.reset();
          this.obtenerpersona(); // Refrescar la lista de personas
          this.accion = 'Agregar';
          this.id = undefined;
          this.sweetAlertService.showSuccessAlert('Persona actualizada correctamente.');
        }, error => {
          this.sweetAlertService.showErrorAlert('Error al actualizar la persona.');
          console.error("Error al actualizar persona", error);
        });
      }

  }

  obtenerpersona(){
    this._PersonaServices.getPersona().subscribe(data =>{
      console.log("data->",data);
      this.listaPersonas = data;
    }, error =>{
      console.log("Error", error)
    });

  }
  enviarFormulario() {
    this.sweetAlertService.showConfirmationDialog().then((result) => {
      if (result) {
        // Si el usuario confirma, envía los datos del formulario
        this.AddPersona();
      } else {
        // Si el usuario cancela, no hagas nada o muestra un mensaje opcional
      }
    });
  }

}
