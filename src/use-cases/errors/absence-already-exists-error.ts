export class AbsenceAlreadyExistsError extends Error {
  constructor() {
    super('Absence already exists with date and user')
  }
}
