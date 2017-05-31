var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () =>{
  it('should create a message', () => {

    var from = 'Matias';
    var text = 'hola pianola';
    var obj = {from:'Matias',text:'hola pianola'};
    var message = generateMessage(from,text);

    expect(message).toInclude(obj);

    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should create a message', () => {
    var lat = 1;
    var lng = 1;
    var from = 'Matias';
    var message = generateLocationMessage(from,lat,lng);

    expect(message.createdAt).toBeA('number');
    expect(message.from).toBe('Matias');
    expect(message.url).toInclude('https://www.google.com/maps?q=');
    expect(message.url).toInclude('1,1');
  })
})
