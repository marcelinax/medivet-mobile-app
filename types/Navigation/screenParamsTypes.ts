export type MultiSelectScreenParams = {
  title: string;
};

export type EditAnimalScreenParams = {
  animalId: number;
};

export type VetClinicScreenParams = {
  clinicId: number;
};

export type VetClinicAvailabilitiesScreenParams = {
  clinic: {
    id: number;
    name: string;
  }
};
