# DorManagePro - Dorm Manage System

DorManagePro 是臺大宿舍專用管理系統，提供宿舍管理員與學生高效溝通平台。管理員可掌握住宿情況、公用設施狀態、報修資訊及夜點活動，提升管理效率；學生則能透過系統完成報修、預約設施及夜點登記，享受便捷的宿舍生活。

## 執行方式

### 1. Backend 的部分

首先請先切換至 backend 的資料夾中，新增一個 .env 的檔案，內容應如下：
 
```
DB_HOST={your_host} 
DB_PORT={your_port}
DB_USER={your_user_name}
DB_PASSWORD={your_password} 
DB_NAME={your_db_name}
```

新增完之後，請直接在 backend 資料夾中執行 `yarn` 這個指令下載所有套件， 若尚未安裝 yarn，請前往[https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
去進行安裝。

### 2. Frontend 的部分

請切換到 frontend 的資料夾，直接執行 `yarn` 這個指令，並成功下載所有套件。

### 3. 程式執行

在開始執行程式前，請先確定 postgreSQL 中已經有建好資料表並將 backup 檔存進資料庫中。若皆確定好即可開始執行程式。

首先先切換到 backend 資料夾中，執行 `npm run dev`，如果有成功的話應該可以看到 console 上出現成功連線資料庫的訊息。

再來，切換至 frontend 資料夾中，執行 `yarn start`，若成功的話將會直接導向瀏覽器的前端頁面，接著便可以透過您資料庫中的使用者或管理者帳密進行登入和使用。

若有操作上的問題歡迎去底下的影片連結中解惑。

## Demo 影片連結

此專案的完整介紹和 Demo 影片連結如下：[https://youtu.be/KSdA3VvajFU](https://youtu.be/KSdA3VvajFU)
