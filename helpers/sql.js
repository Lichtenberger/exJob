const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

function sqlForPartialUpdate(dataToUpdate, jsToSql) { //generates sql for partial update
  const keys = Object.keys(dataToUpdate); //dataToUpdate is the data provided to be updated
  if (keys.length === 0) throw new BadRequestError("No data");
  if(keys.includes('company_handle')) throw new BadRequestError('Can not update company handle')
  jsToSql = jsToSql || {}

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`, //jsToSql is a mapping of JS keys to SQL keys
  );

  return { // returns an object containing the set columns and values
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
