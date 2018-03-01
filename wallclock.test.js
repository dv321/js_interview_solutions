import wallclock from "./wallclock";

test('wallclock 12:30', () => {
    expect(wallclock("12:30")).toBe(165);
});

test('wallclock 12:00', () => {
    expect(wallclock("12:00")).toBe(0);
});

test('wallclock 6:00', () => {
    expect(wallclock("6:00")).toBe(180);
});

test('wallclock 6:30', () => {
    expect(wallclock("6:30")).toBe(15);
});

test('wallclock 8:23', () => {
    expect(wallclock("8:23")).toBe(113.4);
});
