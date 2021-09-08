import * as SQLite from 'expo-sqlite';

function openDatabase() {
    const db = SQLite.openDatabase("Expiration");
    return db;
}

export function createDatabase(db) {
    db.transaction(tx => {
        tx.executeSql("create table if not exists status ( id integer primary key not null, status int, email text, name text );");
    });
}

export function saveLoginStatus(db, userInfo) {

    const { email, name } = userInfo;

    db.transaction(tx => {
        tx.executeSql("select * from status where id = 1", [], (_, { rows: { _array } }) => {
            if (_array.length <= 0) {
                tx.executeSql("insert into status (status, email, name) values (1, ?, ?);", [email, name]);
            } else {
                tx.executeSql("update status set status = 1, name = ?, email = ? where id = 1;", [name, email]);
            }
        });
    });
}

export function saveLogoutStatus(db) {
    db.transaction(tx => {
        tx.executeSql("update status set status = 0, email = '', name = '' where id = 1;");
    });
}

export function createTokenTable(db) {
    db.transaction(tx => {
        tx.executeSql("create table if not exists tokenTable ( id integer primary key not null, token text );");
    });
}

export function saveToken(db, token) {
    db.transaction(tx => {
        tx.executeSql("select * from tokenTable where id = 1", [], (_, { rows: { _array }}) => {
            if (_array.length <= 0) {
                tx.executeSql("insert into tokenTable (token) values (?);", [token]);
            } else {
                tx.executeSql("update tokenTable set token = ? where id = 1;", [token]);
            }
        });
    });
}

const db = openDatabase();

let getTokenPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql("select * from tokenTable where id = 1", [], (_, { rows: { _array }}) => {
            resolve(_array);
        })
    })
})

export async function getToken() {
    let result = await getTokenPromise;

    return result;
}

export default db;