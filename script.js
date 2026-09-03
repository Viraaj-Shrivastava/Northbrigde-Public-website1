
document.addEventListener("DOMContentLoaded",()=>{
  const menu=document.querySelector(".menu-toggle");
  const nav=document.querySelector(".nav-links");
  if(menu&&nav){menu.addEventListener("click",()=>nav.classList.toggle("open"));nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));}
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const t=document.querySelector(a.getAttribute("href"));if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth",block:"start"});}}));
  const form=document.querySelector("#contactForm");
  if(form){form.addEventListener("submit",e=>{e.preventDefault();const name=document.querySelector("#name").value.trim();const email=document.querySelector("#email").value.trim();const company=document.querySelector("#company").value.trim();const message=document.querySelector("#message").value.trim();const subject=encodeURIComponent(`Northbrigde enquiry from ${company||name||"website visitor"}`);const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`);window.location.href=`mailto:YuvaanChaudhary@northbrigde.in?subject=${subject}&body=${body}`;});}
});
