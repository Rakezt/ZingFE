export type Gender = 'male' | 'female' | 'other';

export interface UserState {
  _id?: string;
  firstName: string;
  lastName: string;
  emailId: string;
  password?: string;
  age?: number;
  gender?: Gender;
  photoUrl?: string;
  about?: string;
  interest?: string[];
}

export interface FeedData {
  _id?: string;
  firstName: string;
  lastName: string;
  age?: number;
  gender?: Gender;
  photoUrl?: string;
  about?: string;
  interest?: string[];
}
