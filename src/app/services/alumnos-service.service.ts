import { Injectable } from '@angular/core';
import { Alumno } from '../model/Alumno';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from '../components/home/home.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnosServiceService {
  private baseAlumnoUrl: string = 'http://localhost:8082/escuela/alumno/';
  private baseCarreaUrl: string = 'http://localhost:8082/escuela/carrera/';

  constructor(private httpClient: HttpClient) {}

  getAlumnos(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseAlumnoUrl}findAll`);
  }

  deleteAlumno(idAlumno: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseAlumnoUrl}delete`, {
      cve: idAlumno,
    });
  }

  saveNewAlumno(alumno: Alumno): Observable<any> {
    return this.httpClient.post<any>(`${this.baseAlumnoUrl}createOrUpdate`, {
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

  findAllNamesCareras(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseCarreaUrl}getAllCarrerasNames`);
  }

  findAlumnoByID(idAlumno: number): Observable<any> {
    return this.httpClient.post(`${this.baseAlumnoUrl}getAlumno`, {
      cve: idAlumno,
    });
  }

  editAlumno(alumno: Alumno): Observable<any> {
    return this.httpClient.post<any>(`${this.baseAlumnoUrl}createOrUpdate`, {
      cveAlumno: alumno.cveAlumno,
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
