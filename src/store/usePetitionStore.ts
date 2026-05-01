import { create } from "zustand";
import { MOCK_PETITIONS, Petition } from "../services/mockData";
import { useAuthStore } from "./useAuthStore";

interface PetitionState {
  petitions: Petition[];
  signedPetitionIds: string[];
  isLoading: boolean;
  fetchPetitions: () => Promise<void>;
  signPetition: (
    petitionId: string,
    guestName?: string,
    guestEmail?: string,
  ) => Promise<void>;
  createPetition: (
    title: string,
    description: string,
    goalSignatures: number,
    imageUrl: string,
  ) => Promise<void>;
  addPetition: (payload: {
    title: string;
    description: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    goalSignatures?: number;
  }) => void;
  hasSigned: (petitionId: string) => boolean;
}

export const usePetitionStore = create<PetitionState>((set, get) => ({
  petitions: [],
  signedPetitionIds: [],
  isLoading: false,

  fetchPetitions: async () => {
    set({ isLoading: true });
    await new Promise((res) => setTimeout(res, 500));
    set({ petitions: MOCK_PETITIONS, isLoading: false });
  },

  signPetition: async (
    petitionId: string,
    guestName?: string,
    guestEmail?: string,
  ) => {
    const { signedPetitionIds, petitions } = get();
    if (signedPetitionIds.includes(petitionId)) {
      throw new Error("Already signed");
    }

    // Simulate API delay
    await new Promise((res) => setTimeout(res, 500));

    set({
      signedPetitionIds: [...signedPetitionIds, petitionId],
      petitions: petitions.map((p) =>
        p.id === petitionId
          ? { ...p, signaturesCount: p.signaturesCount + 1 }
          : p,
      ),
    });
  },

  createPetition: async (
    title: string,
    description: string,
    goalSignatures: number,
    imageUrl: string,
  ) => {
    const { petitions } = get();
    const user = useAuthStore.getState().user;

    if (!user) throw new Error("Must be logged in");

    await new Promise((res) => setTimeout(res, 800));

    const newPetition: Petition = {
      id: Math.random().toString(36).substring(7),
      title,
      description,
      imageUrl,
      authorName: user.name,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      signaturesCount: 1, // Author signs automatically
      goalSignatures,
    };

    set({
      petitions: [newPetition, ...petitions],
      signedPetitionIds: [...get().signedPetitionIds, newPetition.id],
    });
  },

  addPetition: ({
    title,
    description,
    imageUrl,
    authorId,
    authorName,
    goalSignatures = 1000,
  }) => {
    const { petitions, signedPetitionIds } = get();

    const newPetition: Petition = {
      id: `p_${Date.now()}`,
      title,
      description,
      imageUrl,
      authorName,
      authorId,
      createdAt: new Date().toISOString(),
      signaturesCount: 1,
      goalSignatures,
    };

    set({
      petitions: [newPetition, ...petitions],
      signedPetitionIds: [...signedPetitionIds, newPetition.id],
    });
  },

  hasSigned: (petitionId: string) => {
    const { signedPetitionIds } = get();
    return signedPetitionIds.includes(petitionId);
  },
}));
