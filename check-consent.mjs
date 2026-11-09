import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const code=readFileSync('assets/web/cookie-consent.js','utf8');
function setup(saved,broken=false){
 const listeners={},buttons=['rejected','accepted'].map(choice=>({dataset:{cookie:choice},addEventListener:(event,fn)=>listeners[choice]=fn,focus(){}}));
 let stored=saved,requests=0,reloads=0;
 const panel={setAttribute(){},querySelectorAll:()=>buttons,querySelector:()=>buttons[0]};
 const document={querySelector:()=>({append(){}}),cookie:'',head:{append:()=>requests++},body:{append(){}},createElement:tag=>tag==='section'?panel:tag==='button'?{setAttribute(){},addEventListener(){},focus(){}}:{}};
 const window={addEventListener(){},alert(){}};
 runInNewContext(code,{window,document,location:{hostname:'bravobrconsultoria.com.br',pathname:'/foods/cardapio',reload:()=>reloads++},localStorage:{getItem:()=>stored,setItem:(key,value)=>{if(broken)throw Error();stored=value;}},Date});
 return {click:choice=>listeners[choice](),requests:()=>requests,reloads:()=>reloads,stored:()=>JSON.parse(stored||'null')};
}
const fresh=setup(null);assert.equal(fresh.requests(),0);fresh.click('rejected');assert.equal(fresh.requests(),0);assert.equal(fresh.stored().choice,'rejected');fresh.click('accepted');assert.equal(fresh.requests(),1);fresh.click('accepted');assert.equal(fresh.requests(),1);fresh.click('rejected');assert.equal(fresh.reloads(),1);
for(const saved of ['broken',JSON.stringify({choice:'accepted',version:1,at:0}),JSON.stringify({choice:'rejected',version:1,at:Date.now()})])assert.equal(setup(saved).requests(),0);
assert.equal(setup(JSON.stringify({choice:'accepted',version:1,at:Date.now()})).requests(),1);
const blocked=setup(null,true);blocked.click('rejected');assert.equal(blocked.requests(),0);
console.log('PASS: consent blocks GTM until acceptance; refusal, persistence, expiry, duplicate loads and revocation tested.');
