import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado.models';
import { Empleadonew} from '../models/empleadonew.models';
import { HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:5012/api/empleados'; 


  constructor(private http: HttpClient) { }


  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  createEmpleado(empleado: Empleadonew, file: File): Observable<Empleadonew> {
    const formData = new FormData();
    formData.append('cedula', empleado.cedula.toString());
    formData.append('nombre', empleado.nombre);
    formData.append('fechaIngreso', empleado.fechaIngreso);
    formData.append('cargoId', empleado.cargoId.toString());
    formData.append('file', file);

    return this.http.post<Empleadonew>(this.apiUrl, formData);
  }

  updateEmpleado(id: number, empleado: Empleadonew, file?: File): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    const formData = new FormData();
    
    formData.append('cedula', empleado.cedula.toString());
    formData.append('nombre', empleado.nombre);
    formData.append('fechaIngreso', empleado.fechaIngreso);
    formData.append('cargoId', empleado.cargoId.toString());
    if (file) {
      formData.append('file', file);
    }
    debugger
    return this.http.put<void>(url, formData);
  }

  deleteEmpleado(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
