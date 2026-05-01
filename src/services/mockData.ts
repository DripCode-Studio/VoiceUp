export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Petition {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  signaturesCount: number;
  goalSignatures: number;
}

export interface Signature {
  id: string;
  userId: string;
  petitionId: string;
  createdAt: string;
}

export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane@example.com",
  },
];

export const MOCK_PETITIONS: Petition[] = [
  {
    id: "p1",
    title: "Protect Local Parks from Commercial Development",
    description:
      "Our local parks are a sanctuary for wildlife and a vital space for our community. We demand that the city council reject the proposed commercial development in Greenfield Park.",
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80",
    authorName: "Sarah Jenkins",
    authorId: "2",
    createdAt: new Date().toISOString(),
    signaturesCount: 1250,
    goalSignatures: 5000,
  },
  {
    id: "p2",
    title: "Implement 4-Day Work Week Nationwide",
    description:
      "Multiple studies have shown that a 4-day work week improves employee well-being and productivity. It is time we update our labor laws to reflect modern needs.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80",
    authorName: "Marcus Wright",
    authorId: "3",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    signaturesCount: 8432,
    goalSignatures: 10000,
  },
  {
    id: "p3",
    title: "Increase Funding for Public Schools in District 9",
    description:
      "Schools in District 9 are severely underfunded, leading to overcrowded classrooms and outdated materials. We must prioritize our children's education.",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
    authorName: "Elena Rodriguez",
    authorId: "4",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    signaturesCount: 432,
    goalSignatures: 1000,
  },
];
