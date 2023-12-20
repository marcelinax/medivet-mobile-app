export interface HandleSubmitForm {
  submit: () => void;
  loading: boolean;
}

export interface HandleSubmitAppointmentCalendarForm extends HandleSubmitForm {
  buttonDisabled: boolean;
}
