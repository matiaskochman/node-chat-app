var expect = require('expect');

var {generateMessage} = require('./message');

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
