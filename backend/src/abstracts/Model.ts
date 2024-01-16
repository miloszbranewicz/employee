export abstract class BaseModel {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  // Validate method to be implemented by subclasses
  abstract validate(): boolean;

  // Common method to check if a field is empty
  isFieldEmpty(field: string | null): boolean {
    return !field || field.trim() === "";
  }

  // Common method to check if a date is in the future
  isDateInFuture(date: Date | null): boolean {
    if (!date) {
      return false;
    }
    const now = new Date();
    // Remove time part from the date
    now.setHours(0, 0, 0, 0);
    return date > now;
  }
}
