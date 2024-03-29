import { Injectable } from '@angular/core';
import { Alumno } from '../model/Alumno';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from '../components/home/home.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnosServiceService {
  private baseUrl: string = 'http://192.168.1.77:8082/escuela/alumno/';

  constructor(private httpClient: HttpClient) {}

  getAlumnos(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}findAll`);
  }

  deleteAlumno(idAlumno: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}delete`, {
      cve: idAlumno,
    });
  }

  saveNewAlumno(alumno: Alumno): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}createOrUpdate`, {
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      fechaNacimiento: alumno.fechaNacimiento,
      direccion: alumno.direccion,
      correoElectronico: alumno.correoElectronico,
      telefono: alumno.telefono,
      carrera: alumno.carrera,
      cursos: alumno.cursos,
    });
  }
}
