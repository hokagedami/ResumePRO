const mysql = require('mysql2/promise');
const db_config = require('../database/config');
const faker = require('faker');



const addEmployee = async () => {

   try {
       const connection = await mysql.createConnection(db_config);

       const first_name = faker.name.firstName();
       const last_name = faker.name.lastName();
       const initial = faker.random.number(26);
       const middle_initial = String.fromCharCode(initial + 64);
       const sex = Math.round(Math.random());
       const address = faker.address.streetAddress();
       const city = faker.address.city();
       const region = faker.address.county();
       const postal_code = faker.address.zipCode();
       const home_phone = faker.phone.phoneNumberFormat(2);
       const office_phone = faker.phone.phoneNumberFormat(2);
       const office_location = faker.address.secondaryAddress();
       const vacation_hours = faker.random.number(400);
       const sick_leave_hours = faker.random.number(400);

       const manager_id = Math.round(Math.random() * 2334);


       await connection.execute(`INSERT into Employee (employee_id, last_name, first_name, middle_initial, sex, 
                                                            address, city, region, postal_code, home_phone, office_phone, 
                                                            office_location, manager_id, vacation_hours, sick_leave_hours)
                                VALUES ( 5, '${last_name}', '${first_name}', '${middle_initial}', '${sex}', '${address}',
                                        '${city}', '${region}', '${postal_code}', '${home_phone}', '${office_phone}',
                                         '${office_location}',${manager_id}, ${vacation_hours}, ${sick_leave_hours})`);

       connection.end();
       return 'Employees Added to DB successfully!';
    } catch (e) {
       return e
   }
};

const addJobHistory = async () => {

   try {
       const connection = await mysql.createConnection(db_config);

       const [rows, fields] = await connection.execute('SELECT title_id FROM Titles');
       const [rows2, fields2] = await connection.execute('SELECT department_id FROM Departments');

       for (let i = 1; i < 6; i++) {
           for (let j = 0; j < 3; j++) {
               const random_year = Math.round(Math.random() * 10);
               const start_date = faker.date.past(random_year);
               const end_date = faker.date.future(Math.round(Math.random() * 5), start_date);
               const date = `${start_date} - ${end_date}`;
               const pay = faker.finance.amount(20000, 100000);

               await connection.execute(`INSERT into Job_History (employee_id, date, title_id, department_id, pay)  
                                VALUES (${i}, '${date}', '${rows[Math.round(Math.random())].title_id}','${rows2[Math.round(Math.random())].department_id}', ${pay})`);
           }
       }

       connection.end();
       return 'Job Histories Added Successfully!';
   } catch (e) {
       return e;
   }
};

const addTitles = async () => {

   try {
       const connection = await mysql.createConnection(db_config);

       for (let i = 8; i < 14; i++) {

           const title = faker.name.jobTitle();
           const description = faker.name.jobDescriptor();
           const low_pay = faker.finance.amount(20000, 50000);
           const high_pay = faker.finance.amount(60000, 100000);
           const level = faker.random.number(10);

           await connection.execute(`INSERT into Titles (title_id, title, level, job_description, low_pay, high_pay)  
                                VALUES (${i}, '${title}', '${level}','${description}', ${low_pay}, ${high_pay})`);
       }

       connection.end();
       return 'Titles Added to DB successfully!';
   }catch (e) {
       return e;
   }

};


const addDepartments = async () => {

    try {
        const connection = await mysql.createConnection(db_config);

        for (let i = 0; i < 5; i++) {

           const department_id = faker.random.number(4565);
           const name = faker.commerce.department();
           const manager_id = i + 1;


            await connection.execute(`INSERT into Departments (department_id, name, manager_id) VALUES (${department_id}, '${name}', ${manager_id})`);
        }

        connection.end();
        return 'Departments Added to DB successfully!';
    }catch (e) {
        return e;
    }
};

