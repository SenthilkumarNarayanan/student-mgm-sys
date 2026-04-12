import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  // Auth APIs
  adminLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/admin/login`, { email, password });
  }

  adminRegister(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/admin/register`, { name, email, password });
  }

  // Student Register - FIXED: Accept object parameter
  studentRegisterComplete(registrationData: {
    regNo: string;
    name: string;
    email: string;
    password: string;
    profile?: { phone: string; address: string };
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/student/register`, registrationData);
  }

  studentLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/student/login`, { email, password });
  }

  // Admin APIs
  enrollStudent(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/student_enroll/`, data);
  }

  getAllLeaves(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/leaves`);
  }

  updateLeaveStatus(leaveId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/leave/${leaveId}`, { status });
  }

  getAdminNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/notification`);
  }

  createNotification(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/notification`, data);
  }

  deleteNotification(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/notification/${id}`);
  }
 markNotificationAsRead(id: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/student/notifications/${id}/read`, {});
}
  getAllStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/students`);
  }

  blockStudent(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/block/${id}`, {});
  }

  unblockStudent(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/unblock/${id}`, {});
  }

  // Student APIs
  getMyLeaves(): Observable<any> {
    return this.http.get(`${this.apiUrl}/student/leave`);
  }

  applyLeave(data: any): Observable<any> {
    console.log('Sending leave data to backend:', data);
    return this.http.post(`${this.apiUrl}/student/leave`, data);
  }

  getStudentNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/student/notifications`);
  }
    getNotifications(): Observable<any> {
    return this.getStudentNotifications();
  }


  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/student/profile/`, data);
  }
}