# Bookmarklet Collection


<a href="javascript:(function(){function h(s){for(var i=0,h=1;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),2654435761);return(h^h>>>7)>>>0;}a=document.querySelectorAll('audio');var v;n=h(window.location.hostname+'_salty!')+'_GlobalVolume';function p(){a.forEach(function(e){e.volume=v;});t.value=v;}c=document.createElement('div');c.style='position:fixed;bottom:0px;right:0px;z-index:999999;';t=document.createElement('input');t.type='range';t.max=1;t.min=0;t.step=0.05;t.value=0.75;t.onchange=function(){v=t.value;localStorage.setItem(n,v);p();};x=document.createElement('button');x.textContent='X';x.onclick=function(){document.body.removeChild(c);delete(c);};c.appendChild(t);c.appendChild(x);document.body.appendChild(c);v=localStorage.getItem(n)||0.75;p();})()">Global volume control for HTML5 players</a>

