function sumSalary(salaries) {
  let sum = 0;
  for (let salary of Object.values(salaries)) {
    if (typeof (salary) === 'number' && isFinite(salary)) {
      sum += salary;
    }
  }
  return sum;
}
