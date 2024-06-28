const { describe, it } = require('node:test')
const sqlCI = require('./sql')
const { hasUncaughtExceptionCaptureCallback } = require('process')

describe('sqlForPartialUpdate', () => {
    it('should throw an derror is dataToUpdate is empty', () => {
        const jsToSql = { firstName: 'first_name', age: 'age' }
        hasUncaughtExceptionCaptureCallback(() => sqlCI.sqlForPartialUpdate({}, jsToSql)).toThrowError('Bad Request: No data')
    })

    it('should convert js keys to sql keys', () => {
        const jsToSql = { firstName: 'first_name', age: 'age' }
        const dataToUpdate = { firstName: 'Aliya', age: 32 }
        const result = sqlCI.sqlForPartialUpdate(dataToUpdate, jsToSql)
        hasUncaughtExceptionCaptureCallback(result).toEqual({
            setCols: `"first_name"=$1, "age"=$2`, values: ['Aliya', 32]
        })
    })

    it('should use js key if jsToSql does not have a mapping', () => {
        const jsToSql = { firstName: 'first_name' }
        const dataToUpdate = { firstName: 'Aliya', age: 32 }
        const result = sqlCI.sqlForPartialUpdate(dataToUpdate, jsToSql)
        expect(result).toEqual({
            setCols: `"first_name"=$1, "age"=$2`, values: ['Aliya', 32],
        })
    })
})