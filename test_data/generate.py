import csv
import random
import bcrypt
from faker import Faker
from datetime import date

fake = Faker()

def encrypt_ssn(ssn):
    return bcrypt.hashpw(ssn.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def generate_ssn():
    return f"{random.choice('ABCDEFGHIJKLMNO')}{random.randint(100000000, 999999999)}"

def generate_student_id():
    return f"{random.choice(['b', 'r'])}{random.randint(10000000, 99999999)}"

def generate_phone_number():
    return f"09{random.randint(100000000, 999999999)}"

def generate_dorm_id(gender):
    dorm_id_length = 8 if gender == 'male' else 9
    return f'DORM-{"".join(str(random.randint(0,9)) for _ in range(dorm_id_length))}'

def generate_admin_data(num_records):
    return [
        {
            "ssn": encrypt_ssn(generate_ssn()),
            "username": fake.user_name(),
            "password": encrypt_ssn(fake.password(length=10)),
            "dorm_id": generate_dorm_id(random.choice(['male', 'female'])),
            "email": fake.email(),
            "phone": generate_phone_number()
        }
        for _ in range(num_records)
    ]

def generate_user_data(num_records):
    return [
        {
            "ssn": encrypt_ssn(generate_ssn()),
            "username": fake.user_name(),
            "password": encrypt_ssn(fake.password(length=10)),
            "student_id": generate_student_id(),
            "b_id": f"BED-{random.randint(100, 999)}",
            "phone": generate_phone_number(),
            "email": fake.email(),
            "dorm_id": generate_dorm_id(random.choice(['male', 'female'])),
            "due_date": date.today().strftime("%Y-%m-%d")
        }
        for _ in range(num_records)
    ]

def generate_bed_data(num_records):
    bed_ids = set()
    return [
        {
            "b_id": _generate_unique_bed_id(bed_ids),
            "dorm_id": generate_dorm_id(random.choice(['male', 'female'])),
            "ssn": encrypt_ssn(generate_ssn()),
            "password": encrypt_ssn(fake.password(length=10)),
            "room_number": f"ROOM-{random.randint(10, 99)}"
        }
        for _ in range(num_records)
    ]

def _generate_unique_bed_id(existing_ids):
    while True:
        new_id = f"BED-{random.randint(100, 999)}"
        if new_id not in existing_ids:
            existing_ids.add(new_id)
            return new_id

def write_csv(filename, fieldnames, data):
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

# Generate and write data
admin_data = generate_admin_data(10)
user_data = generate_user_data(50)
bed_data = generate_bed_data(100)

write_csv('admin.csv', ['ssn', 'username', 'password', 'dorm_id', 'email', 'phone'], admin_data)
write_csv('user.csv', ['ssn', 'username', 'password', 'student_id', 'b_id', 'phone', 'email', 'dorm_id', 'due_date'], user_data)
write_csv('bed.csv', ['b_id', 'dorm_id', 'ssn', 'password', 'room_number'], bed_data)

print("CSV files generated: admin.csv, user.csv, bed.csv")