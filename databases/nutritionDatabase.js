import {database} from 'better-sqlite3';

//create database connection
const nutritionDB = new Database('nutrition.db');
nutritionDB.pragma('journal_mode = WAL');

//check if nutrition database exists
const stmt = nutritionDB.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='nutritionInfo';`);

let row = stmt.get();
if (row === undefined) {
        console.log('Nutrition database appears to be empty. Creating Nutrition database');

        const = sqlInit = `
        CREATE Table nutritionInfo (
                calories INTEGER, protein INTEGER, carbohydrate INTEGER, fat INTEGER);
                INSERT INTO nutritionInfo (calories, protein, carbohydrate, fat) VALUES (?, ?, ?, ?)
                `;
        nutritionDB.exec(sqlInit);
        console.log('nutritionInfo database has been initialized with a new table and four entries containing calories, protein, carbohydrate, and fat.');
} else {
        console.log('Nutrition Database exists.');
}

module.exports = nutritionDB;
