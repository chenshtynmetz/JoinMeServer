import * as get_functions from "./model/get_functions.js"
// const get_functions = require('./get_functions.js')

test('get users', () => {
    return get_functions.getUsers().then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('get my created history', () => {
    return get_functions.getMyCreatedHistory("AgctICqQOkb8MbVVwnuvhhCUAO82").then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('get my joined history', () => {
    return get_functions.getMyJoinedHistory("AgctICqQOkb8MbVVwnuvhhCUAO82").then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('get group participants', () => {
    return get_functions.getGroupParticipants("TLOeIvSlteU56P6YjJxl").then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('get reported users', () => {
    return get_functions.getReportedUsers().then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('check blocked user', () => {
    return get_functions.checkBlockedUser("AgctICqQOkb8MbVVwnuvhhCUAO82").then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('get user', () => {
    return get_functions.getUser("AgctICqQOkb8MbVVwnuvhhCUAO82").then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('get categories', () => {
    return get_functions.getCategories().then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('get categories', () => {
    return get_functions.getCategories().then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('count categories', () => {
    return get_functions.countCategories().then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('compare happened', () => {
    return get_functions.compareHappened().then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
}, 10000);

test('get group details', () => {
    return get_functions.getGroupDetails("TLOeIvSlteU56P6YjJxl").then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('get top users', () => {
    return get_functions.getTopUsers().then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('get groups', () => {
    return get_functions.getGroups("Minnian").then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});

test('get related groups', () => {
    return get_functions.getRelatedGroups("Minnian").then(data => {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
    });
});
