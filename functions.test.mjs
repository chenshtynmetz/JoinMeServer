import * as get_functions from "./model/get_functions.js"
// const get_functions = require('./get_functions.js')

test('get users', () => {
    return get_functions.getUsers().then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});