import {database} from 'better-sqlite3';

//create database connection
const db = new Database('interaction.db');
db.pragma('journal_mode = WAL');

//check if interaction database exists
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='interactionInfo';`);

let row = stmt.get();
if (row === undefined) {
        console.log('Interaction database appears to be empty. Creating Interaction database');

        const = sqlInit = `
        CREATE Table interactionInfo (
                timeStamp INTEGER);
                INSERT INTO interactionInfo (timeStamp) VALUES (?)
                `;
        db.exec(sqlInit);
        console.log('interactionInfo database has been initialized with a new table and one entry containing timeStamp.');
} else {
        console.log('Interaction Database exists.');
}
