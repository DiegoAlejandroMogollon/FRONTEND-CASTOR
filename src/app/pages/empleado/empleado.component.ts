import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado.models';
import { Empleadonew } from '../../models/empleadonew.models';
import { TipoCargo } from '../../types/tipoCargo';
@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {

  empleados: Empleado[] = [];
  newEmpleado: Empleadonew = { cedula: 0, nombre: '', fechaIngreso:'', cargoId:0,fotoRuta:''};
  tiposCargo = [
    { id: 1, nombre: 'Scrum Master' },
    { id: 2, nombre: 'Desarrollador' },
    { id: 3, nombre: 'QA' },
    { id: 4, nombre: 'PO' }
  ];
  selectedEmpleado: Empleado | null = null;
  showGestionButtons = false;
  showEmpleados = false;
  showCrear = false;
  isEditing = false;
  private baseUrl: string = 'http://localhost:5012';

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }

  toggleGestion(): void {
    this.showGestionButtons = !this.showGestionButtons;
  }

  showCrearEmpleado(): void {
    this.showCrear = true;
    this.showEmpleados = false;
    this.addEmpleado
  }

  showConsultarEmpleados(): void {
    this.showCrear = false;
    this.showEmpleados = true;
    this.empleadoService.getEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }

  addEmpleado(): void {
    debugger
    const fileInput = (document.querySelector('#fileInput') as HTMLInputElement);
    const file = fileInput.files ? fileInput.files[0] : null;

    if (file) {
      const fechaIngresoISO = new Date(this.newEmpleado.fechaIngreso).toISOString();
      const empleadoToSend = {
        ...this.newEmpleado,
        fechaIngreso: fechaIngresoISO
      };
      
      this.empleadoService.createEmpleado(empleadoToSend, file).subscribe(data => {
        this.newEmpleado = { cedula: 0, nombre: '', fotoRuta: '', fechaIngreso: '', cargoId: 0 };
        fileInput.value = '';
        this.showCrear = true;
      alert('Empleado creado con éxito'); 
    }, error => {
      alert('Hubo un error al crear el empleado');
      });
    }
  }


  deleteEmpleado(id: number): void {
    this.empleadoService.deleteEmpleado(id).subscribe(() => {
      this.showConsultarEmpleados();
    });
    this.showEmpleados = false;
  }

  editEmpleado(empleado: Empleado): void {
    this.selectedEmpleado = { ...empleado };
    this.isEditing = true;
    this.showEmpleados = false;
  }

  updateEmpleado(): void {
    debugger
    if (this.selectedEmpleado) {
      const fileInput = (document.querySelector('#fileInput') as HTMLInputElement);
      const file = fileInput.files ? fileInput.files[0] : undefined;
      const empleadoToUpdate: Empleadonew = {
        cedula: this.selectedEmpleado.cedula,
        nombre: this.selectedEmpleado.nombre,
        fechaIngreso: new Date(this.selectedEmpleado.fechaIngreso).toISOString(), 
        cargoId: this.selectedEmpleado.cargo.idCargo,
        fotoRuta: this.selectedEmpleado.fotoRuta
      };
  
      this.empleadoService.updateEmpleado(this.selectedEmpleado.id, empleadoToUpdate, file).subscribe(() => {
        this.showEmpleados = true;
        this.isEditing = false;
        this.selectedEmpleado = null;
        this.showConsultarEmpleados();
      }, error => {
        alert('Hubo un error al actualizar el empleado');
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedEmpleado = null;
    this.showEmpleados = true;
  }

  getImageUrl(fotoRuta: string): string {
    return `${this.baseUrl}${fotoRuta}`;
  }

}
