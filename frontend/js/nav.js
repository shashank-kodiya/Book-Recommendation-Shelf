
document.addEventListener('DOMContentLoaded',()=>{
 const n=document.querySelector('nav');if(!n)return;
 const logged=!!localStorage.getItem('token');
 n.innerHTML=`<a class="brand" href="/index.html">📚 Book Shelf</a>
 <a href="/books.html">Books</a>${logged?'<a href="/dashboard.html">Dashboard</a><a href="/shelf.html">My Shelf</a><a href="/recommendations.html">Recommendations</a><a href="/analytics.html">Analytics</a>':''}
 ${localStorage.getItem('isAdmin')==='true'?'<a href="/admin.html">Admin</a>':''}
 ${logged?'<button onclick="logout()">Logout</button>':'<a href="/login.html">Login</a><a href="/register.html">Register</a>'}`;
 if(logged)setInterval(()=>apiFetch('/auth/heartbeat',{method:'POST'}).catch(()=>{}),60000);
});
