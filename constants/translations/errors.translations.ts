export default {
  USER_WITH_THIS_EMAIL_DOES_NOT_EXIST: 'Użytkownik o takim adresie email nie istnieje',
  EMAIL_SHOULD_NOT_BE_EMPTY: 'Nieprawidłowy adres email',
  EMAIL_MUST_BE_AN_EMAIL: 'Nieprawidłowy adres email',
  PASSWORD_SHOULD_NOT_BE_EMPTY: 'Nieprawidłowe hasło',
  SOMETHING_WENT_WRONG: 'Coś poszło nie tak. Spróbuj ponownie później',
  WRONG_PASSWORD: 'Nieprawidłowe hasło',
  PASSWORD_MUST_BE_LONGER_THAN_OR_EQUAL_TO_6_CHARACTERS: 'Hasło powinno zawierać co najmniej 6 znaków',
  NAME_SHOULD_NOT_BE_EMPTY: 'Wprowadź imię',
  USER_WITH_THIS_EMAIL_ALREADY_EXISTS: 'Użytkownik o takim adresie email już istnieje',
  TERMS_ARE_NOT_ACCEPTED: 'Zaakceptuj regulamin',
  BIRTHDATE_SHOULD_NOT_BE_EMPTY: 'Nieprawidłowa data urodzenia',
  BIRTHDATE_MUST_BE_A_DATE_INSTANCE: 'Nieprawidłowa data urodzenia',
  USER_HAS_TO_BE_AT_LEAST_18_YEARS_OF_AGE: 'Musisz mieć ukończone 18 lat',
  BIRTH_DATE_CANNOT_BE_LATER_THAN_TODAY: 'Data urodzenia nie może być późniejsza niż dzisiejsza',
  PHONENUMBER_MUST_BE_A_VALID_PHONE_NUMBER: 'Nieprawidłowy numer telefon',
  BREEDID_SHOULD_NOT_BE_EMPTY: 'Wybierz rasę',
  TYPE_SHOULD_NOT_BE_EMPTY: 'Wybierz typ',
  SPECIALIZATIONIDS_SHOULD_NOT_BE_EMPTY: 'Musisz wybrać przynajmniej jedną specjalizację',
  CANNOT_REMOVE_VET_SPECIALIZATION_WHICH_IS_ALREADY_IN_USE:
    'Nie możesz usunąć specjalizacji, która przypisana jest do jednej z Twoich klinik',
  VET_AVAILABILITY_FOR_CLINIC_AND_SPECIALIZATION_ALREADY_EXISTS:
    'Dostępność dla Twojej wybranej specjalizacji dla tej kliniki została już utworzona.',
  SPECIALIZATIONID_SHOULD_NOT_BE_EMPTY: 'Wybierz specjalizację',
  RECEPTIONHOURS_SHOULD_NOT_BE_EMPTY: 'Dodaj co najmniej jedną godzinę przyjmowania',
  RECEPTION_HOUR_COLLIDES_WITH_EXISTING_ONE: 'Godzina przyjmowania koliduje z już istniejącą',
  RECEPTION_HOUR_COLLIDES_WITH_ANOTHER_ONE: 'Godzina przyjmowania koliduje z wcześniej dodaną',
  HOUR_TO_CANNOT_BE_EARLIER_THAN_HOUR_FROM: 'Godzina "od" nie może być późniejsza niż godzina "do"',
  PRICE_SHOULD_NOT_BE_EMPTY: 'Nieprawidłowa cena',
  DURATION_SHOULD_NOT_BE_EMPTY: 'Nieprawidłowy czas trwania',
  SPECIALIZATIONMEDICALSERVICEID_SHOULD_NOT_BE_EMPTY: 'Wybierz usługę',
  CANNOT_CREATE_MORE_THAN_ONE_VET_PROVIDED_MEDICAL_SERVICE_FOR_SAME_SPECIALIZATION_IN_ONE_CLINIC:
    'Usługa już istnieje dla tej kliniki i specjalizacji.',
  CANNOT_CREATE_APPOINTMENT_BECAUSE_OF_NOT_AVAILABLE_DATE: 'Wybrana przez Ciebie data nie jest już dostępna.',
  CANNOT_ADD_AN_OPINION_TO_NOT_FINISHED_APPOINTMENT: 'Nie można dodać opinii do wizyty, która się nie odbyła.',
  YOU_HAVE_ALREADY_ADDED_AN_OPINION_TO_APPOINTMENT: 'Dodałeś już opinię.',
  'CANNOT_CANCEL_APPOINTMENT_IN_DIFFERENT_STATUS_THAN_"IN_PROGRESS"':
    'Nie można anulować wizyty o innym statusie niż "W trakcie"',
  'CANNOT_FINISH_APPOINTMENT_IN_DIFFERENT_STATUS_THAN_"IN_PROGRESS"':
    'Nie można zakończyć wizyty o innym statusie niż "W trakcie"',
  FORBIDDEN_RESOURCE: 'Brak dostępu',
} as Record<string, string>;
