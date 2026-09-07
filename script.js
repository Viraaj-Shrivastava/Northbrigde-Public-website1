
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

const device = document.querySelector('.device');
if(device){
  window.addEventListener('mousemove',(e)=>{
    if(window.innerWidth<980) return;
    const x=(e.clientX/window.innerWidth-.5)*7;
    const y=(e.clientY/window.innerHeight-.5)*5;
    device.style.transform=`perspective(1300px) rotateY(${x-5}deg) rotateX(${-y+2}deg)`;
  });
}



// Stagger reveals so sections feel composed rather than generated.
document.querySelectorAll('.cards, .flow-steps').forEach(group=>{
  [...group.children].forEach((el,i)=>{
    el.style.transitionDelay = `${i*70}ms`;
  });
});

// Animate metrics once when they enter view.
const metricObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done='1';
    const raw=entry.target.textContent.trim();
    const num=parseInt(raw.replace(/\D/g,''),10);
    if(!num) return;
    let start=0;
    const duration=700;
    const t0=performance.now();
    function tick(t){
      const p=Math.min(1,(t-t0)/duration);
      const eased=1-Math.pow(1-p,3);
      entry.target.textContent=Math.round(num*eased);
      if(p<1) requestAnimationFrame(tick);
      else entry.target.textContent=raw;
    }
    requestAnimationFrame(tick);
  });
},{threshold:.6});
document.querySelectorAll('.metric strong').forEach(el=>metricObserver.observe(el));

// Small parallax only on the hero, intentionally restrained.
const hero = document.querySelector('.hero');
if(hero){
  window.addEventListener('mousemove',(e)=>{
    if(window.innerWidth<900) return;
    const x=(e.clientX/window.innerWidth-.5);
    const y=(e.clientY/window.innerHeight-.5);
    document.querySelectorAll('.data-rail').forEach((rail,i)=>{
      rail.style.marginLeft=`${x*(i+1)*4}px`;
      rail.style.marginTop=`${y*(i+1)*2}px`;
    });
  });
}
