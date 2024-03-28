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
}
