export function validateQueryFilter(queryFilter: any): boolean {
    const valid_operators = ['$eq', '$ne', '$gt', '$gte', '$lt', '$lte', '$in', '$nin'];
    const date_pattern = /^\d{4}-\d{2}-\d{2}$/;  // Pattern for ISO 8601 dates

    if (typeof queryFilter !== 'object' || Array.isArray(queryFilter)) {
        throw new Error("queryFilter must be an object.");
    }

    for (let key in queryFilter) {
        const value = queryFilter[key];
        // Validate that value is an object with a valid operator
        if (typeof value !== 'object' || Array.isArray(value)) {
            throw new Error("The value in queryFilter must be an object.");
        }
        if (Object.keys(value).length !== 1) {
            throw new Error("The value in queryFilter must contain exactly one operator.");
        }

        let operator = Object.keys(value)[0];
        let operand = value[operator];
        if (!valid_operators.includes(operator)) {
            throw new Error(`Invalid operator '${operator}' in query filter.`);
        }

        // Validate the operand based on the operator
        if (['$eq', '$ne'].includes(operator)) {
            if (typeof operand !== 'number' && typeof operand !== 'string' && typeof operand !== 'boolean') {
                throw new Error(`The operand of '${operator}' must be a number, string, or boolean.`);
            }
        } else if (['$gt', '$gte', '$lt', '$lte'].includes(operator)) {
            if (typeof operand === 'number') {
                continue;
            } else if (typeof operand === 'string') {
                if (!date_pattern.test(operand)) {
                    throw new Error(`The operand of '${operator}' must be a number or date string in ISO 8601 format.`);
                }
            } else {
                throw new Error(`The operand of '${operator}' must be a number or date string.`);
            }
        } else if (['$in', '$nin'].includes(operator)) {
            if (!Array.isArray(operand) || !operand.every(i => typeof i === 'number' || (typeof i === 'string'))) {
                throw new Error(`The operand of '${operator}' must be a list of numbers or date strings in ISO 8601 format.`);
            }
        }
    }
    return true;
}