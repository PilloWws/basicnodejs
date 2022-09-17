import { json } from 'body-parser';
import e from 'express';
import pool from '../configs/connectDB.js';

let getHomePage = async (req, res) => {
    // logic
    let data = [];
    // pool.query(
    //     'SELECT * FROM `users`',
    //     function(err, results, fields) {
    //       console.log(results); // results contains rows returned by server
    //       results.map(row => {data.push({
    //         id: row.userId,
    //         email: row.email, 
    //         address: row.address,
    //         firstName: row.firstName,
    //         lastName: row.lastName
    //       })});
    //     }
    //   );
      const [rows, fields] = await pool.execute('SELECT * FROM `users`');

      return res.render('index.ejs', {dataUser: rows});
}
let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user, fields] = await pool.execute(`SELECT * FROM users WHERE userId = ${userId}`);
    return res.send(JSON.stringify(user));
}

let createNewUser = async (req, res) => {
  let {firstName, lastName, email, address} = req.body;
  await pool.execute('INSERT INTO users(firstName, lastName, email, address) VALUES (?,?,?,?)', [firstName, lastName, email, address]);
  return res.redirect('/');
}
module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser
}