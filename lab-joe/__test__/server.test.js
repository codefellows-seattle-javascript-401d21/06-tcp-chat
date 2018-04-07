'use strict'

const server = require('../server')
const net = require('net')

require('jest')

describe('server module', function(){

// need this
afterAll(() => server.close())

describe('setting up a connection to the server', () => {

it('should connect and notify me that i joined the channel', done =>{

  let client = net.connect({port: 3000})
  client.on('data', data => {
  expect(data.toString()).toMatch(/has joined the game/);
  // expect(data.toString()).toMatch(/Boogie Nights/);



expect('my name is joe').toMatch(/name is/);

  client.end()
  done()
  })

})

})


// describe('testing facefalm command', () => {
//   if('it should faceblm', done => {
//     let socket = net.connect({port: 3000}, ()=>{
//       socket.on('data', (data) => {
//         messages.push(data.toString());
//       })
//       socket.write('@facepalm', () =>{
//         expect(messages[1]).toMatch(/is disappointed/);
//       })

//     })
//   })
// })



})