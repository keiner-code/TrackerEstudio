export interface Project {
  id: number;
  title: string;
  language: Language;
  progress: number;
  hours_per_day: number;
  description: string;
  comments: ProjectComment[];
  status: string;
  total_hours: number;
  study_day: string;
  created_at: string;
  updated_at: string;
}

export interface Language {
  id: number;
  name: string;
  project_size: number;
  icon: string;
  color: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateLanguage {
  name: string;
  project_size: number;
  icon: string;
  color: string;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  age: string;
  photo?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUser {
  name: string;
  lastName: string;
  age: number;
  photo: string | null;
}

export interface createProject {
  title: string;
  language_id: string;
  description: string;
  study_day: string;
}

export interface ProjectComment {
  id: number;
  project_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CreateComment {
  project_id: number;
  content: string;
}
