import { sessionStorageService } from './sessionStorageService';
import { apiSubjectHealthInfoService } from './apiSubjecthealthInfoService';
import { apiSubjectDataService } from './apiSubjectDataService'; // Import the new service
import { userSessionService } from './UserSessionService';
import { ISubjectHealthInfo } from '../types/subjectHealthInfo.type';
import { ISubject } from '../types/subject.type';

class SubjectInfoManagementService {
  private tempKeyPrefix = 'temp_subject_';
  private token: string;

  constructor() {
    this.token = userSessionService.getToken() || ''; // Retrieve token from userSessionService
  }

  // Create subject (temporary or permanent)
  async createSubject(subject: ISubject, mode: string): Promise<ISubject> {
    let newSubject: ISubject;
    if (mode === 'temp') {
      sessionStorageService.setItem(this.tempKeyPrefix + subject.id, subject, this.token);
      newSubject = subject;
    } else {
      const response = await apiSubjectDataService.postData(subject);
      newSubject = await response.json();
    }
    return newSubject;
  }

  // Get subject (temporary or permanent)
  async getSubject(subjectId: string, mode: string): Promise<ISubject> {
    let subject: ISubject;
    if (mode === 'temp') {
      subject = sessionStorageService.getItem<ISubject>(this.tempKeyPrefix + subjectId, this.token) || {} as ISubject;
    } else {
      const response = await apiSubjectDataService.getData(subjectId);
      subject = await response.json();
    }
    return subject;
  }

  // Create subject health info (temporary or permanent)
  async createSubjectHealthInfo(subjectHealthInfo: ISubjectHealthInfo, mode: string): Promise<ISubjectHealthInfo> {
    let newSubjectHealthInfo: ISubjectHealthInfo;
    if (mode === 'temp') {
      sessionStorageService.setItem(this.tempKeyPrefix + subjectHealthInfo.id, subjectHealthInfo, this.token);
      newSubjectHealthInfo = subjectHealthInfo;
    } else {
      const response = await apiSubjectHealthInfoService.postData(subjectHealthInfo);
      newSubjectHealthInfo = await response.json();
    }
    return newSubjectHealthInfo;
  }

  // Get subject health info (temporary or permanent)
  async getSubjectHealthInfo(subjectId: string, mode: string): Promise<ISubjectHealthInfo> {
    let subjectHealthInfo: ISubjectHealthInfo;
    if (mode === 'temp') {
      subjectHealthInfo = sessionStorageService.getItem<ISubjectHealthInfo>(this.tempKeyPrefix + subjectId, this.token) || {} as ISubjectHealthInfo;
    } else {
      const response = await apiSubjectHealthInfoService.getData(subjectId);
      subjectHealthInfo = await response.json();
    }
    return subjectHealthInfo;
  }
}

export const subjectInfoManagementService = new SubjectInfoManagementService();
