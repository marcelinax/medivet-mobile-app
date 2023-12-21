export interface HandleSubmitForm {
  submit: () => void;
}

export interface HandleSubmitAppointmentCalendarForm extends HandleSubmitForm {
  buttonDisabled: boolean;
}
