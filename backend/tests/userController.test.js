// import request from 'supertest';
// import server from '../server';
// const mongoose = require('mongoose');
// const User = require('../models/userModel');
// require('dotenv').config();

// describe("Database Connection", () => {
    
// });

// describe("Post /api/users/", () => {
//     describe('Testing the Register Controller', () => {
//         beforeAll(async () => {
//             await mongoose.connect(process.env.MONGO_URI, {
//                 useNewUrlParser: true,
//                 useCreateIndex: true,
//                 useUnifiedTopology: true,
//             })
//         });

//         test('1. should respond with a 400 status code when fields is not given', async () => {
//             const response = await request(server)
//                 .post('/api/users/')
//             expect(response.status).toEqual(400);
//         });

//         test('2. should respond with a 400 status code when fields is empty', async () => {
//             const response = await request(server)
//                 .post('/api/users/')
//                 .send({
//                     firstName: '',
//                     lastName: '',
//                     email: '',
//                     password: ''
//                 })
//             expect(response.status).toEqual(400);
//         });

//         test('3. should respond with a 200 status code when fields are given', async () => {
//             const response = await request(server)
//                 .post('/api/users/')
//                 .send({
//                     firstName: 'John',
//                     lastName: 'Smith',
//                     email: 'john@example.com',
//                     password: 'password'
//                 })

//             expect(response.status).toEqual(200);
//         });

//         test('4. should use the email field to check if the user is already registered', async () => {
//             const data = {
//                 firstName: 'John',
//                 lastName: 'Smith',
//                 email: 'test@gmail.com',
//                 password: 'password'
//             };

//             const response = await request(server)
//                 .post('/api/users/')
//                 .send(data)

//             const user = await User.findOne({
//                 email: data.email
//             })

//             expect(user).toEqual(user);
//             expect(response.status).toEqual(400);
//         });

//         test('5. should create a user with the given fields', async () => {
//             const data = {
//                 firstName: 'John',
//                 lastName: 'Smith',
//                 email: 'smith@gmail.com',
//                 password: 'password'
//             };

//             const response = await request(server)
//                 .post('/api/users/')
//                 .send(data)

//             const user = await User.findOne({
//                 email: data.email
//             })

//             const newUser = await User.create(data);

//             expect(newUser).toEqual(newUser);
//             expect(user).toEqual(null);
//             expect(response.status).toEqual(200);
//         })

//         test('6. should specify json in the content type of the header', async () => {
//             const response = await request(server)
//                 .post('/api/users/')
//                 .send({
//                     firstName: 'John',
//                     lastName: 'Smith',
//                     email: 'john@example.com',
//                     password: 'password'
//                 })

//             expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
//             expect(response.status).toEqual(200);
//         });

//         test('7. should respond with a json object containing the user id, fullname, verify, and token', async () => {

//         });

//         afterAll(async () => {
//             await mongoose.disconnect();
//         });
//     });
// })

