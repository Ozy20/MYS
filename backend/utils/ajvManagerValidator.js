const AJV = require('ajv');
const ajv = new AJV();

const managerSchema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 2, maxLength: 100 },
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 }
    },
    required: ["name", "email", "password"],
    additionalProperties: false
};

module.exports.validateManager = (data) => {
    const validate = ajv.compile(managerSchema);
    const valid = validate(data);
    if (!valid) {
        return { valid: false, errors: validate.errors };
    }
    return { valid: true };
}