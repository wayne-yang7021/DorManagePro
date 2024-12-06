const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
// const fs = require('fs'); // 引入 Node.js 文件系統模組
require('dotenv').config(); // 加載 .env 文件

const password = process.env.DB_PASSWORDS; // 從環境變量中獲取密碼

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
