const assert=require('node:assert/strict');

const elements={
  go:{},
  use:{value:'wifi'},
  devices:{value:'few'},
  priority:{value:'easy'},
  result:{hidden:true,innerHTML:''}
};

global.document={getElementById:id=>elements[id]};
global.localStorage={getItem:()=>null,setItem(){}};
global.window={AFFILIATE_OFFERS:[
  {enabled:false,name:'Disabled VPN',url:'https://disabled.example/',disclosure:'広告'},
  {enabled:true,name:'Enabled VPN',url:'https://enabled.example/',disclosure:'広告'}
]};

require('../app.js');
assert.equal(typeof elements.go.onclick,'function');
elements.go.onclick();
assert.equal(elements.result.hidden,false);
assert.match(elements.result.innerHTML,/公衆Wi/);
assert.doesNotMatch(elements.result.innerHTML,/Disabled VPN/);
assert.match(elements.result.innerHTML,/Enabled VPN/);
assert.match(elements.result.innerHTML,/sponsored nofollow noopener/);

console.log('6 assertions PASS: disabled affiliate offers stay hidden');
