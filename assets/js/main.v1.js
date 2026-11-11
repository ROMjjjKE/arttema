
(function(){
  'use strict';
  var WA='https://wa.me/375333429031';
  var burger=document.getElementById('burger'), drawer=document.getElementById('drawer'),
      closeBtn=document.getElementById('drawerClose'), lastFocus=null;
  function openD(){ if(!drawer) return; lastFocus=document.activeElement; drawer.hidden=false;
    document.body.classList.add('is-locked'); if(burger) burger.setAttribute('aria-expanded','true'); if(closeBtn) closeBtn.focus(); }
  function closeD(){ if(!drawer||drawer.hidden) return; drawer.hidden=true;
    document.body.classList.remove('is-locked'); if(burger) burger.setAttribute('aria-expanded','false'); if(lastFocus) lastFocus.focus(); }
  if(burger) burger.addEventListener('click',openD);
  if(closeBtn) closeBtn.addEventListener('click',closeD);
  if(drawer) drawer.addEventListener('click',function(e){ if(e.target===drawer) closeD(); });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape') closeD();
    if(e.key==='Tab' && drawer && !drawer.hidden){
      var f=drawer.querySelectorAll('a,button'); if(!f.length) return;
      var first=f[0], last=f[f.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    }
  });
  window.addEventListener('resize',function(){ if(window.innerWidth>859) closeD(); });

  var cut=document.getElementById('cut');
  if(cut){
    var D=[]; try{ D=JSON.parse(document.getElementById('cutData').textContent); }catch(e){}
    var t=document.getElementById('cp-title'), d=document.getElementById('cp-desc'),
        k=document.getElementById('cp-kick'), cta=document.getElementById('cp-cta');
    var groups=[].slice.call(cut.querySelectorAll('[data-part]'));
    var btns=[].slice.call(cut.querySelectorAll('#cutLegend button'));
    function paint(i){
      var s=D[i]; if(!s) return;
      k.textContent='Деталь проёма · '+(i+1)+' из '+D.length;
      t.textContent=s.n; d.textContent=s.d;
      cta.href=WA+'?text='+encodeURIComponent('Здравствуйте! Вопрос по установке двери: интересует «'+s.n+'». Подскажите, как правильно?');
      groups.forEach(function(g){ g.setAttribute('aria-pressed', g.getAttribute('data-part')===s.k?'true':'false'); });
      btns.forEach(function(b,bi){ b.setAttribute('aria-pressed', bi===i?'true':'false'); });
    }
    btns.forEach(function(b,bi){ b.addEventListener('click',function(){ paint(bi); }); });
    groups.forEach(function(g){
      var key=g.getAttribute('data-part');
      g.addEventListener('click',function(){ for(var i=0;i<D.length;i++){ if(D[i].k===key){ paint(i); return; } } });
      g.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){ e.preventDefault();
          for(var i=0;i<D.length;i++){ if(D[i].k===key){ paint(i); return; } } }
      });
    });
    paint(0);
  }

  var stepsBox=document.getElementById('steps');
  if(stepsBox){
    var SD=[]; try{ SD=JSON.parse(document.getElementById('stepsData').textContent); }catch(e){}
    var sk=document.getElementById('st-kick'), st=document.getElementById('st-title'),
        sd=document.getElementById('st-desc'), scta=document.getElementById('st-cta');
    var sb=[].slice.call(stepsBox.querySelectorAll('.steps button'));
    function paintS(i){
      var s=SD[i]; if(!s) return;
      sk.textContent='Этап '+s.n+' из 07';
      st.textContent=s.t; sd.textContent=s.d;
      scta.href=WA+'?text='+encodeURIComponent('Здравствуйте! Вопрос по монтажу дверей, этап «'+s.t+'». Как это проходит у нас на объекте?');
      sb.forEach(function(b,bi){ b.setAttribute('aria-pressed', bi===i?'true':'false'); });
    }
    sb.forEach(function(b,bi){ b.addEventListener('click',function(){ paintS(bi); }); });
    paintS(0);
  }

  var kit=document.getElementById('kit');
  if(kit){
    var W=document.getElementById('k-w'), H=document.getElementById('k-h'), T=document.getElementById('k-t'),
        SIDE=document.getElementById('k-side'), OTK=document.getElementById('k-otk'),
        pw=document.getElementById('k-polotno'), dob=document.getElementById('k-dobor'),
        nal=document.getElementById('k-nal'),
        per=document.getElementById('k-per'), kcta=document.getElementById('k-cta');
    function val(el,def){ var v=parseFloat(String(el.value).replace(',','.')); return isFinite(v)&&v>0?v:def; }
    function f1(n){ return n.toLocaleString('ru-RU',{maximumFractionDigits:1,minimumFractionDigits:1}).replace(/\u00A0/g,' '); }
    function floor5(n){ return Math.floor(n/5)*5; }
    function paintK(){
      var w=val(W,900), h=val(H,2050), th=val(T,120);
      var sides=parseInt(SIDE.value,10)||2, needOtk=OTK.value==='1';
      var leafW=floor5(w-75), leafH=floor5(h-45);
      var doborMm=th-70, doborTxt='не нужен';
      if(doborMm>0){ doborTxt=Math.ceil(doborMm/10)*10+' мм'; }
      var perM=(2*h+w)/1000;
      var nalM=(2*(h/1000)+(w/1000))*1.1*sides;
      var otkM2=perM*(th/1000);
      pw.textContent=leafW+' × '+leafH+' мм';
      dob.textContent=doborTxt;
      nal.textContent=f1(nalM)+' м';
      per.textContent=f1(perM)+' м';
      var otkCell=document.getElementById('k-otk-out');
      if(otkCell) otkCell.textContent=needOtk?f1(otkM2)+' м²':'не нужны';
      kcta.href=WA+'?text='+encodeURIComponent('Здравствуйте! Замер с сайта:\nПроём: '+w+' × '+h+' мм, стена '+th+' мм\nНаличник: '+(sides===2?'с двух сторон':'с одной стороны')+'\nОткосы: '+(needOtk?'нужны':'не нужны')+'\nОриентир полотна: '+leafW+' × '+leafH+' мм\nДобор: '+doborTxt+'\nНаличник: '+f1(nalM)+' м\nКогда можно приехать на замер?');
    }
    [W,H,T].forEach(function(el){ if(el) el.addEventListener('input',paintK); });
    [SIDE,OTK].forEach(function(el){ if(el) el.addEventListener('change',paintK); });
    paintK();
  }

  var form=document.getElementById('leadForm'), msg=document.getElementById('formMsg');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var d=new FormData(form), name=(d.get('name')||'').toString().trim(), phone=(d.get('phone')||'').toString().trim();
      if(name.length<2||phone.length<6){ msg.textContent='Нужны имя и телефон, иначе не перезвонить.'; return; }
      var lines=['Заявка с сайта: '+document.title,'Имя: '+name,'Телефон: '+phone,
        'Что нужно: '+(d.get('job')||''),'Проёмов: '+(d.get('qty')||'')];
      var m=(d.get('msg')||'').toString().trim(); if(m) lines.push('Комментарий: '+m);
      msg.textContent='Открываю WhatsApp с готовым сообщением.';
      window.open(WA+'?text='+encodeURIComponent(lines.join('\n')),'_blank');
    });
  }
})();
