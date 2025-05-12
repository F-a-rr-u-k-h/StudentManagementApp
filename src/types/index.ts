export interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentStatus: 'Enrolled' | 'Graduated' | 'Alumni';
  photo?: string;
}

export interface Preferences {
  filterStatus?: string;
}