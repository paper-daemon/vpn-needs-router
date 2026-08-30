const assert=require('node:assert/strict');

const elements={
  go:{},
  use:{value:'wifi'},
  devices:{value:'few'},
  priority:{value:'easy'},
  result:{hidden:true,innerHTML:''}
};

global.location={href:'https://paper-daemon.github.io/vpn-needs-router/'};
global.document={getElementById:id=>elements[id]};
global.localStorage={getItem:()=>null,setItem(){}};
global.window={AFFILIATE_OFFERS:[
  {enabled:false,name:'Disabled VPN',url:'https://disabled.example/',disclosure:'広告'},
  {enabled:true,name:'Enabled <VPN>',url:'https://enabled.example/?a=1&b=2',disclosure:'広告 <b>test</b>'},
  {enabled:true,name:'Bad URL',url:'javascript:alert(1)',disclosure:'広告'}
]};

const {escHtml,safeOfferUrl}=require('../app.js');
assert.equal(typeof elements.go.onclick,'function');
elements.go.onclick();
assert.equal(elements.result.hidden,false);
assert.match(elements.result.innerHTML,/公衆Wi/);
assert.doesNotMatch(elements.result.innerHTML,/Disabled VPN/);
assert.match(elements.result.innerHTML,/Enabled &lt;VPN&gt;/);
assert.doesNotMatch(elements.result.innerHTML,/Bad URL/);
assert.doesNotMatch(elements.result.innerHTML,/javascript:/);
assert.match(elements.result.innerHTML,/a=1&amp;b=2/);
assert.match(elements.result.innerHTML,/広告 &lt;b&gt;test&lt;\/b&gt;/);
assert.match(elements.result.innerHTML,/sponsored nofollow noopener/);
assert.equal(safeOfferUrl('javascript:alert(1)'),'');
assert.equal(escHtml('<script>'),'&lt;script&gt;');

console.log('12 assertions PASS: affiliate offers are filtered and escaped');