import {database} from 'better-sqlite3';

//create database connection
const db = new Database('nutrition.db');
db.pragma('journal_mode = WAL');

//check if nutrition database exists
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='nutritionInfo';`);

let row = stmt.get();
if (row === undefined) {
        console.log('Nutrition database appears to be empty. Creating Nutrition database');

        const = sqlInit = `
        CREATE Table nutritionInfo (
                calories INTEGER, protein INTEGER, carbohydrate INTEGER, fat INTEGER);
                INSERT INTO nutritionInfo (calories, protein, carbohydrate, fat) VALUES (?, ?, ?, ?)
                `;
        db.exec(sqlInit);
        console.log('nutritionInfo database has been initialized with a new table and four entries containing calories, protein, carbohydrate, and fat.');
} else {
        console.log('Nutrition Database exists.');
}
