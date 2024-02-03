import { User } from 'types/api/user/types';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { Animal } from 'types/api/animal/types';

export type MultiSelectScreenParams = {
  title: string;
  id: string;
};

export type SelectScreenParams = {
  title: string;
  id: string;
};

export type EditAnimalScreenParams = {
  animalId: number;
};

export type VetClinicScreenParams = {
  clinicId: number;
};

export type CreateVetClinicAvailabilityReceptionHourScreenParams = {
  index?: number;
};

export type EditVetClinicAvailabilityScreenParams = {
  availabilityId: number;
};

export type EditVetClinicProvidedMedicalServiceScreenParams = {
  medicalServiceId: number;
};

export type VetScreenParams = {
  vetId: number;
  shouldRefreshOpinionsAmount?: boolean;
}

export type OpinionScreenParams = {
  vetId: number;
  appointmentId: number;
  preventNavigateToVetScreen?: boolean;
}

export type AppointmentCalendarScreenParams = {
  vet: User;
  clinicId?: number;
  medicalService?: VetClinicProvidedMedicalService;
  date?: string;
  animal?: Animal;
}

export type AppointmentScreenParams = {
  appointmentId: number;
  opinionAdded?: boolean;
  diaryCreated?: boolean;
}

export type AnimalScreenParams = {
  animalId: number;
}

export type CreateAppointmentDiaryScreenParams = {
  appointmentId: number;
}

export type AppointmentDiaryScreenParams = {
  diaryId: number;
}

export type AppointmentDiariesScreenParams = {
  animalId: number;
}

export type UserOpinionScreenParams = {
  opinionId: number;
}
