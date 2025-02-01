/**
 * Creates a custom error object with a specified name.
 * You can then set a custom error message using the returned object's `message` method.
 *
 * @param {string} name - The name to assign to the error object.
 * @returns {object} An object with a `message` method that sets error message end return error.
 */

const createException = (name) => {
    const error = new Error();
    error.name = name; // Set custom name for error

    
    return {
        message: (message) => {
            error.message = message
            return error;
        }
    };
}

export default createException;