interface IBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  createdAt: Date | null;
}

interface IAuthCredentials {
  email: string;
  fullName: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface IBookParams {
  title: string;
  description: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  coverUrl: string;
  coverColor: string;
  videoUrl: string;
  summary: string;
}
