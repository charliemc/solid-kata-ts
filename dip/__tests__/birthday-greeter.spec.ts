import MonthDay from '../src/month-day';
import EmployeeRepository from '../src/employee-repository';
import Clock from '../src/clock';
import BirthdayGreeter from '../src/birthday-greeter';
import Employee from '../src/employee';
import EmployeeBuilder from './employee-builder';

describe('birthday greeter', () => {
  const CURRENT_MONTH: number = 7;
  const CURRENT_DAY_OF_MONTH: number = 9;
  const TODAY: MonthDay = new MonthDay(CURRENT_MONTH, CURRENT_DAY_OF_MONTH);

  let employeeRepository: EmployeeRepository;
  let clock: Clock;

  let birthdayGreeter: BirthdayGreeter;

  let consoleLogMock: jest.SpyInstance;

  beforeEach(() => {
    employeeRepository = { findEmployeesBornOn: jest.fn() };
    clock = { monthDay: jest.fn() };

    birthdayGreeter = new BirthdayGreeter(employeeRepository, clock);
  });

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
  });

  afterAll(() => {
    consoleLogMock.mockRestore();
  });

  it('should send greeting email to employee', () => {
    spyOn(clock, 'monthDay').and.returnValue(TODAY);

    const employee: Employee = EmployeeBuilder.anEmployee().build();
    spyOn(employeeRepository, 'findEmployeesBornOn').and.callFake(
      (monthDay: MonthDay) => {
        const isToday =
          monthDay.getMonth() === CURRENT_MONTH &&
          monthDay.getDay() === CURRENT_DAY_OF_MONTH;
        return isToday ? [employee] : [];
      }
    );

    birthdayGreeter.sendGreetings();

    expect(console.log).toHaveBeenCalledWith(
      `To: ${employee.getEmail()}, Subject: Happy birthday!, Message: Happy birthday, dear ${employee.getFirstName()}!`
    );
  });
});
