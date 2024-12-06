const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const fs = require('fs'); // 引入 Node.js 文件系統模組

// 從 db.password.txt 讀取密碼
const password = fs.readFileSync('./db.password.txt', 'utf-8').trim(); // 讀取檔案並去除多餘空白字符

// 設定 PostgreSQL 連接池
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_final_project',
  password: password, // 使用從文件讀取的密碼
  port: 5432,
});

// 使用 Drizzle 建立資料庫連接
const db = drizzle(pool);

module.exports = db;
