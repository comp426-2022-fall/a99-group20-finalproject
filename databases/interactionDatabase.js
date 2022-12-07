import {database} from 'better-sqlite3';

//create database connection
const interactionDB = new Database('interaction.db');
interactionDB.pragma('journal_mode = WAL');

//check if interaction database exists
const stmt = interactionDB.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='interactionInfo';`);

let row = stmt.get();
if (row === undefined) {
        console.log('Interaction database appears to be empty. Creating Interaction database');

        const = sqlInit = `
        CREATE Table nutritionInfo (
                calories INTEGER, protein INTEGER, carbohydrate INTEGER, fat INTEGER);
                INSERT INTO nutritionInfo (calories, protein, carbohydrate, fat) VALUES (?, ?, ?, ?)
                `;
        interactionDB.exec(sqlInit);
        console.log('interactionInfo database has been initialized with a new table and one entry containing ');
} else {
        console.log('Interaction Database exists.');
}

module.exports = interactionDB;
