
const API='/api';
function token(){return localStorage.getItem('token')}
async function apiFetch(url,opts={}){opts.headers={...(opts.headers||{}),'Content-Type':'application/json',...(token()?{Authorization:'Bearer '+token()}:{})};const r=await fetch(API+url,opts);const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.message||'Request failed');return d}
function requireLogin(){if(!token())location.href='/login.html'}
function logout(){apiFetch('/auth/logout',{method:'POST'}).finally(()=>{localStorage.clear();location.href='/index.html'})}
