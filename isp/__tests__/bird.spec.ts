import Bird from '../src/bird';

describe('bird', () => {
  const bird: Bird = new Bird();
  let consoleLogMock: jest.SpyInstance;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
  });

  it('should run', () => {
    bird.run();

    expect(console.log).toBeCalledWith('Bird is running');
  });

  it('should fly', () => {
    bird.fly();

    expect(console.log).toBeCalledWith('Bird is running');
  });
});
