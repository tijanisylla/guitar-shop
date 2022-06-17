// Returns a string like ("name", "title", "description"...)
function createInsertString(fields) {
    const insertString = Object.keys(fields).map((key) => { return `"${key}"` }).join(', ');
    return insertString;
};

// Returns a string like ($1, $2, $3, $4...)
function createValueString(fields) {
    const valueString = Object.values(fields).map( (_, index) => `$${index + 1}` ).join(', ');
    return valueString;
};

function createSetString(fields) {
    const setString = Object.keys(fields).map( (key, index) => `"${key}" = $${index + 1}` ).join(', ');
    return setString;
};

module.exports = {
    createInsertString,
    createValueString,
    createSetString
};