export default class Pattern {
  private pattern: number;
  private date: Date;
  private day: number;

  constructor() {
    this.pattern = -1; //Initialize as an incorrect value to force new assignment
    this.date = new Date(this.getJPTime()); //Need JP time
    this.day = this.date.getDay();
  }

  async isValidPattern(): Promise<Boolean> {
    this.updateDate();
    if (this.patternShouldChange() || this.pattern == -1) {
      this.day = this.date.getDay();
      return false;
    } else {
      return true;
    }
  }

  private patternShouldChange() {
    if (this.date.getDay() != this.day && (this.date.getHours() > 0 || this.date.getMinutes() >= 15)) {
      return true;
    }
    return false;
  }

  private updateDate() {
    this.date = new Date(this.getJPTime());
  }

  set(pattern: number) {
    this.pattern = pattern;
  }

  get(): number {
    return this.pattern;
  }

  getJPTime(): string {
    return new Date().toLocaleString('en-US', { timeZone: 'Japan' });
  }
}
