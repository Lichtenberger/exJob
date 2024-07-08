
const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require('./sql')

/**
 * Test suite for the sqlForPartialUpdate function.
 */
describe("sqlForPartialUpdate()", () => {
  /**
   * Test case: When dataToUpdate is empty.
   * Expected behavior: BadRequestError should be thrown with "No data" message.
   */
  test("throws BadRequestError when dataToUpdate is empty", () => {
    const dataToUpdate = {};
    const jsToSql = {};

    expect(() => sqlForPartialUpdate(dataToUpdate, jsToSql))
      .toThrow(BadRequestError);
  });

  /**
   * Test case: When dataToUpdate contains valid data.
   * Expected behavior: Return object with setCols and values properties.
   */
  test("returns setCols and values for valid data", () => {
    const dataToUpdate = {
      firstName: 'Aliya',
      age: 32
    };
    const jsToSql = {
      firstName: 'first_name',
      age: 'age'
    };
    const expectedCols = '"first_name"=$1, "age"=$2';
    const expectedValues = ['Aliya', 32];
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: expectedCols,
      values: expectedValues
    });
  });

  /**
   * Test case: When jsToSql is not provided.
   * Expected behavior: Columns should be wrapped with double quotes.
   */
  test("uses original column names when jsToSql is not provided", () => {
    const dataToUpdate = {
      firstName: 'Aliya',
      age: 32
    };
    const result = sqlForPartialUpdate(dataToUpdate);

    expect(result).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ['Aliya', 32]
    });
  });
});