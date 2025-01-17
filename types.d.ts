interface IBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  total_copies: number;
  available_copies: number;
  description: string;
  color: string;
  cover: string;
  video: string;
  isLoanedBook?: boolean;
}

interface IAuthCredentials {
  email: string;
  fullName: string;
  password: string;
  universityId: number;
  universityCard: string;
}
