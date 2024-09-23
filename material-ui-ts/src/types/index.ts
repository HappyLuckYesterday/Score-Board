export interface User {
  id: number;
  user_id: number;
  name: string;
  nick_name: string;
  email: string;
  type: string;
  active_flag: 'Y' | 'N';
  group_id: number;
}

export interface Group {
  id: number;
  name: string;
}

export interface Score {
  id: number;
  user_id: number;
  group_id: number;
  score: number;
  create_id: number;
  create_time: string;
  update_id: number;
  update_time: string;
}

export interface Subject {
  id: number;
  name: string;
  description: string;
  due_date: string;
  score: number;
  accept: 'Y' | 'N';
  create_time: string;
  create_id: number;
}

export interface Subscribe {
  id: number;
  user_id: number;
  subject_id: number;
  create_id: number;
  create_time: string;
  update_id: number;
  update_time: string;
}