(() =>{
  function toDirectDriveImageUrl(input){
    if(!input || typeof input !== 'string') return input;
    const url = input.trim();
    const pathMatch = url.match(/\/file\/d\/([^/]+)/);
    const queryMatch = url.match(/[?&]id=([^&]+)/);
    const fileId = pathMatch?.[1] || queryMatch?.[1] || (/^[a-zA-Z0-9_-]{20,}$/.test(url) ? url : null);
    return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : url;
  }

  function normalizeApp(app){
    return {
      ...app,
      icon: toDirectDriveImageUrl(app.icon),
      playStore: (app.playStore || '').trim(),
      screenshots: (app.screenshots || []).map(toDirectDriveImageUrl)
    };
  }

  // Smooth scrolling with Lenis
  const lenis = new Lenis({duration:1.2, easing: t => Math.min(1,1 - Math.pow(1 - t, 3))});
  function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  function setTheme(light){
    if(light){ document.documentElement.classList.remove('dark'); document.documentElement.classList.add('light'); themeToggle.textContent='Dark'; localStorage.setItem('theme','light'); }
    else { document.documentElement.classList.remove('light'); document.documentElement.classList.add('dark'); themeToggle.textContent='Light'; localStorage.setItem('theme','dark'); }
  }
  themeToggle.addEventListener('click', ()=> setTheme(!document.documentElement.classList.contains('light')));
  const saved = localStorage.getItem('theme'); if(saved==='light') setTheme(true);

  // Load apps.json and render stacked cards with play icon positioned bottom-right
  async function loadApps(){
    try{
      const res = await fetch('data/apps.json');
      const apps = (await res.json()).map(normalizeApp);
      const grid = document.getElementById('apps-grid');
      grid.innerHTML = '';
      apps.forEach((app, idx) => {
        const wrap = document.createElement('div'); wrap.className = 'wrap reveal';

        const stack = document.createElement('div'); stack.className = 'stack app-card'; stack.setAttribute('role','article'); stack.style.position='relative';

        const col = document.createElement('div'); col.className = 'col';
        const thumb = document.createElement('div'); thumb.className = 'thumbnail app-icon';
        const img = document.createElement('img'); img.src = app.icon; img.alt = app.name; img.width = 64; img.height = 64; img.loading = 'lazy';
        thumb.appendChild(img);

        const meta = document.createElement('div'); meta.className = 'meta app-info';
        const name = document.createElement('div'); name.className = 'app-name'; name.textContent = app.name;
        const short = document.createElement('div'); short.className = 'app-short'; short.textContent = app.short;
        meta.appendChild(name); meta.appendChild(short);

        col.appendChild(thumb); col.appendChild(meta);

        const pos = document.createElement('div'); pos.className = 'position';
        const playLink = document.createElement('a'); playLink.className = 'play-link'; playLink.href = app.playStore; playLink.target = '_blank'; playLink.rel='noopener';
        playLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18l15-9L5 3z"/></svg>`;
        pos.appendChild(playLink);

        // clicking the card opens the playStore
        stack.addEventListener('click', (e)=>{
          // if the user clicked the playLink itself, let the anchor handle it
          if(e.target.closest('.play-link')) return;
          window.open(app.playStore, '_blank');
        });

        // keyboard accessibility
        stack.tabIndex = 0;
        stack.addEventListener('keydown', (e)=>{ if(e.key==='Enter') window.open(app.playStore,'_blank'); });

        stack.appendChild(col);
        stack.appendChild(pos);
        wrap.appendChild(stack);
        grid.appendChild(wrap);
      });

      // Update featured/install button to point to primary app (passwords) if present
      const primary = apps.find(a=>a.id==='passwords') || apps[0];
      if(primary){
        const installBtn = document.getElementById('install-featured');
        if(installBtn) installBtn.href = primary.playStore;
        const latestBtn = document.getElementById('latest-app');
        if(latestBtn){ latestBtn.addEventListener('click', (e)=>{ e.preventDefault(); window.open(primary.playStore,'_blank'); }); }

        screenshots = (primary.screenshots && primary.screenshots.length > 0)
          ? primary.screenshots
          : screenshots;

        if(phoneImg && screenshots.length > 0){
          phoneImg.src = screenshots[0];
        }
      }

      setupReveal();
      animateAppCards();
    }catch(e){console.error('apps load failed',e)}
  }
  loadApps();

  // Intersection reveal
  function setupReveal(){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); obs.unobserve(e.target); } });
    },{threshold:0.12});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
  }

  // GSAP entrance animations
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-title',{y:24,opacity:0,duration:0.9,ease:'power3.out'});
  gsap.from('.hero-lead',{y:18,opacity:0,duration:0.9,delay:0.12});
  gsap.from('.hero-ctas .btn',{y:12,opacity:0,duration:0.7,stagger:0.08,delay:0.2});

  // Scroll-triggered card animations (run after cards render)
  function animateAppCards(){
    gsap.utils.toArray('.app-card').forEach((card, i)=>{
      gsap.from(card,{opacity:0,y:20,duration:0.7,delay: i*0.04,scrollTrigger:{trigger:card, start:'top 90%'}});
    });
  }

  // Phone screenshot slider
  let current = 0;
  let screenshots = [];
  const phoneImg = document.querySelector('#phone-screen img');
  document.getElementById('open-screens').addEventListener('click', ()=>{
    current = (current + 1) % screenshots.length;
    gsap.to(phoneImg,{opacity:0,duration:0.18,onComplete:()=>{ phoneImg.src = screenshots[current]; gsap.to(phoneImg,{opacity:1,duration:0.28}); }});
  });

  // Latest app / view apps buttons
  document.getElementById('cta-view').addEventListener('click', ()=>{
    document.getElementById('apps').scrollIntoView({behavior:'smooth'});
  });
  document.getElementById('view-apps').addEventListener('click', ()=>{
    document.getElementById('apps').scrollIntoView({behavior:'smooth'});
  });

  // Minimal floating animation
  gsap.to('.floating-card',{y:-10,repeat:-1,yoyo:true,duration:3,ease:'sine.inOut'});

  // Simple canvas dots in hero
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let w,h,particles=[];
  function resize(){ w=canvas.width=canvas.clientWidth; h=canvas.height=canvas.clientHeight; particles=[]; for(let i=0;i<40;i++){ particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+0.4,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3}) } }
  window.addEventListener('resize', resize); resize();
  function tick(){ ctx.clearRect(0,0,w,h); particles.forEach(p=>{ p.x += p.vx; p.y += p.vy; if(p.x<0) p.x=w; if(p.x>w) p.x=0; if(p.y<0)p.y=h; if(p.y>h)p.y=0; ctx.beginPath(); ctx.fillStyle='rgba(124,77,255,0.08)'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); }); requestAnimationFrame(tick); }
  requestAnimationFrame(tick);

})();
