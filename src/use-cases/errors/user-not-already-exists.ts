export class UserNotAlredyExistsError extends Error {
  constructor() {
    super('User not already exists.')
  }
}
