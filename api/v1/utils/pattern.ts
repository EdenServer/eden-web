export default class Pattern {
  private pattern: number;
  private date: Date;
  private day: number;

  constructor() {
    this.pattern = -1; //Initialize as an incorrect value to force new assignment
    this.date = new Date(new Date(this.getJPTime())); //Need JP time
    this.day = this.date.getDay();
  }

  async isValidPattern(): Promise<Boolean> {
    await this.updateDate();
    if ((await this.patternShouldChange()) || this.pattern == -1) {
      this.day = this.date.getDay();
      return false;
    } else {
      return true;
    }
  }

  private async patternShouldChange() {
    if (this.date.getDay() != this.day && (this.date.getHours() > 0 || this.date.getMinutes() >= 15)) {
      return true;
    }
    return false;
  }

  private async updateDate() {
    this.date = new Date(this.getJPTime());
  }

  async update(pattern: number) {
    this.pattern = pattern;
  }

  async get(): Promise<any> {
    return this.pattern;
  }

  private getJPTime(): string {
    return new Date().toLocaleString('en-US', { timeZone: 'Japan' });
  }
}
