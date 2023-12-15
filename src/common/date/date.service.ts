export class DateService {
  public getNumberOfDaysRelativeToDueDate(bill) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    return Math.abs(currentDay - Number(bill.dayDue));
  }
}
