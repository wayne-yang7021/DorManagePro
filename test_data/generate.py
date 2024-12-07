import pandas as pd
import random
import bcrypt
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()

# SSN 加密與解密
original_ssns = {}

def encrypt_ssn(ssn):
    return bcrypt.hashpw(ssn.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def generate_ssn():
    letter = random.choice('ABCDEFGHIJKLMNO')
    numbers = ''.join(str(random.randint(0, 9)) for _ in range(9))
    return f"{letter}{numbers}"

def generate_student_id():
    prefix = random.choice(['b', 'r'])
    numbers = ''.join(str(random.randint(0, 9)) for _ in range(8))
    return f"{prefix}{numbers}"

def generate_phone():
    return f"09{random.randint(100000000, 999999999)}"

def random_date(start, end):
    return start + timedelta(days=random.randint(0, (end - start).days))

def random_token():
    return f"session-{random.randint(100000, 999999)}-{random.randint(1000, 9999)}"

def generate_room_numbers_and_bed_ids():
    room_numbers = []
    bed_ids = []
    for prefix in range(1, 5):  # 房間號 1 到 4 開頭
        for suffix in range(0, 61):  # 房間號後綴 00 到 60
            room_number = f"{prefix}{suffix:02}"
            room_numbers.append(room_number)
            # 每個房間對應 A-D 床位
            for bed_suffix in "ABCD":
                bed_ids.append(f"{room_number}{bed_suffix}")
    return room_numbers, bed_ids

# 生成房間號和床位號
room_numbers, all_bed_ids = generate_room_numbers_and_bed_ids()
used_bed_ids = set()  # 記錄已使用的床位號

# 數據生成
admin = []
users = []
beds = []
facilities = []
move_records = []
move_applications = []
snack_records = []
snack_options = []
book_records = []
maintenance_records = []
semesters = []

# 學期生成 (假設從 2023 年開始，共生成 6 個學期)
for year in range(2020, 2024):
    for term in range(1, 3):  # 每年兩個學期
        semesters.append({"semester": f"{year - 1911}-{term}"})  # 民國年

for i in range(1, 101):  # 假設生成 100 條記錄
    ssn = generate_ssn()
    encrypted_ssn = encrypt_ssn(ssn)
    
    # 原始 SSN 保存用於參考
    original_ssns[encrypted_ssn] = ssn
    
    dorm_id = f"DORM{i%10+1:02}"
    room_number = random.choice(room_numbers)
    bed_id = None
    while not bed_id or bed_id in used_bed_ids:
        bed_id = f"{room_number}{random.choice('ABCD')}"
    used_bed_ids.add(bed_id)
    
    student_id = generate_student_id()
    phone = generate_phone()
    username = f"user{i}"
    email = f"{username}@example.com"
    session_token = random_token()
    due_date = random_date(datetime(2023, 1, 1), datetime(2024, 12, 31))
    semester = random.choice(semesters)["semester"]

    # Admin 表
    if i <= 10:  # 假設有 10 條 Admin 記錄
        admin.append({
            "ssn": encrypted_ssn,
            "dorm_id": dorm_id,
            "email": f"admin{i}@example.com",
            "phone": generate_phone()
        })

    # Users 表
    users.append({
        "ssn": encrypted_ssn,
        "studentId": student_id,
        "bId": bed_id,
        "phone": phone,
        "email": email,
        "dormId": dorm_id,
        "due_date": due_date.strftime("%Y/%m/%d"),
        "sessionToken": session_token
    })

    # Beds 表
    beds.append({
        "bId": bed_id,
        "dormId": dorm_id,
        "ssn": encrypted_ssn,
        "roomNumber": room_number
    })

    # Facilities 表
    facilities.append({
        "fId": i,
        "fName": f"Facility{i}",
        "dormId": dorm_id,
        "forRent": random.choice([True, False]),
        "underMaintenance": random.choice([True, False]),
    })

    # Move Records 表
    move_in_date = random_date(datetime(2022, 1, 1), datetime(2023, 1, 1))
    move_out_date = random_date(datetime(2023, 1, 2), datetime(2024, 12, 31))
    move_records.append({
        "ssn": encrypted_ssn,
        "bId": bed_id,
        "moveInDate": move_in_date.strftime("%Y/%m/%d"),
        "moveOutDate": move_out_date.strftime("%Y/%m/%d")
    })

    # Move Applications 表
    move_applications.append({
        "ssn": encrypted_ssn,
        "applyId": i,
        "semester": semester,
        "dormId": dorm_id,
        "applyTime": datetime.now().strftime("%Y/%m/%d %H:%M:%S"),
        "status": random.choice(["pending", "approved", "rejected"])
    })

    # Snack Records 表
    snack_records.append({
        "ssn": encrypted_ssn,
        "semester": semester,
        "dormId": dorm_id
    })

    # Snack Options 表
    snack_options.append({
        "ssn": encrypted_ssn,
        "semester": semester,
        "dormId": dorm_id,
        "sName": f"Snack{i}"
    })

    # Book Records 表
    book_records.append({
        "ssn": encrypted_ssn,
        "fId": i,
        "isCancelled": random.choice([True, False]),
        "bookTime": datetime.now().strftime("%Y/%m/%d %H:%M:%S")
    })

    # Maintenance Records 表
    maintenance_records.append({
        "ssn": encrypted_ssn,
        "description": f"Maintenance issue {i}",
        "fixedDate": random_date(datetime(2023, 1, 1), datetime(2024, 1, 1)).strftime("%Y/%m/%d"),
        "isFinished": random.choice([True, False])
    })

# 轉換為 DataFrame 並保存為 CSV
data_frames = {
    "admin": pd.DataFrame(admin),
    "user": pd.DataFrame(users),
    "bed": pd.DataFrame(beds),
    "facility": pd.DataFrame(facilities),
    "move_record": pd.DataFrame(move_records),
    "move_application": pd.DataFrame(move_applications),
    "snack_record": pd.DataFrame(snack_records),
    "snack_option": pd.DataFrame(snack_options),
    "book_record": pd.DataFrame(book_records),
    "maintenance_record": pd.DataFrame(maintenance_records),
    "semester": pd.DataFrame(semesters),
}

for name, df in data_frames.items():
    df.to_csv(f"{name}.csv", index=False, encoding='utf-8-sig')

# 保存原始 SSN 對應關係
pd.DataFrame.from_dict(original_ssns, orient='index', columns=['original_ssn']) \
    .reset_index().rename(columns={'index': 'encrypted_ssn'}) \
    .to_csv('ssn_mapping.csv', index=False, encoding='utf-8-sig')

print("CSV files generated: admin.csv, user.csv, bed.csv, facility.csv, move_record.csv, move_application.csv, snack_record.csv, snack_option.csv, book_record.csv, maintenance_record.csv, semester.csv, ssn_mapping.csv")
