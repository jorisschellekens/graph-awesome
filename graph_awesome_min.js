function __get_text_width(t,e){let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.style.visibility="hidden",document.body.appendChild(r);let i=document.createElementNS("http://www.w3.org/2000/svg","text");i.setAttribute("font-size",e),i.textContent=t,r.appendChild(i);let l=i.getBBox().width;return document.body.removeChild(r),l}function __generate_legend(t,e,r=20){let i=t.length,l=Math.ceil(Math.sqrt(1.618*i)),s=Math.max(...t.map(t=>__get_text_width(t,r,"Arial"))),n=.25*r,a=r+n+s+n,b=r+n,$="http://www.w3.org/2000/svg",u=document.createElementNS($,"svg");return u.setAttribute("width",Math.ceil(l*a)),u.setAttribute("height",Math.ceil(Math.ceil(i/l)*b)),t.forEach((t,i)=>{let s=i%l*a,n=Math.floor(i/l)*b,h=document.createElementNS($,"g"),o=document.createElementNS($,"rect");o.setAttribute("x",s),o.setAttribute("y",n),o.setAttribute("rx",r/20),o.setAttribute("ry",r/20),o.setAttribute("width",r),o.setAttribute("height",r),o.setAttribute("fill",e[i%e.length]);let c=document.createElementNS($,"text");c.setAttribute("x",s+r+.25*r),c.setAttribute("y",n+r),c.setAttribute("font-size",r),c.setAttribute("fill","#000"),c.textContent=t,h.appendChild(o),h.appendChild(c),u.appendChild(h)}),u}function __generate_HSV_colors(t){return 3===t?["#f6511d","#ffb400","#00a6ed"]:4===t?["#219ebc","#023047","#ffb703","#fb8500"]:5==t?["#55dde0","#33658a","#2f4858","#f6ae2d","#f26419"]:Array.from({length:t},(e,r)=>`hsl(${360*r/t}, 100%, 50%)`)}function __bar_chart(t,e,r=100,i=100,l=10){let s=Math.max(...e),n=(r-2*l)/e.length,a=__generate_HSV_colors(e.length),b="http://www.w3.org/2000/svg",$=document.createElementNS(b,"svg");return $.setAttribute("width",r),$.setAttribute("height",i),e.forEach((t,e)=>{let r=t/s*(i-l),u=document.createElementNS(b,"rect");u.setAttribute("x",e*n+l),u.setAttribute("y",i-r),u.setAttribute("rx",n/20),u.setAttribute("ry",n/20),u.setAttribute("width",n-2),u.setAttribute("height",r),u.setAttribute("fill",a[e%a.length]),$.appendChild(u)}),$}function __box_plot(t,e,r,i){var l,s,n,a,b,$,u,h,o,c,g;if(0===t.length)return null;t.sort((t,e)=>t-e);let d=t[Math.floor(.25*t.length)],A=t[Math.floor(.5*t.length)],p=t[Math.floor(.75*t.length)],w=t[0],f=t[t.length-1],_="http://www.w3.org/2000/svg",m=document.createElementNS(_,"svg");m.setAttribute("width",e),m.setAttribute("height",r);let x=document.createElementNS(_,"rect"),E=(i+(p-w)/(f-w)*(e-2*i)-(i+(d-w)/(f-w)*(e-2*i)))*.618;x.setAttribute("x",i+(d-w)/(f-w)*(e-2*i)),x.setAttribute("y",(r-E)/2),x.setAttribute("width",i+(p-w)/(f-w)*(e-2*i)-(i+(d-w)/(f-w)*(e-2*i))),x.setAttribute("height",E),x.setAttribute("fill","#ffb703"),x.setAttribute("stroke","black");let S=document.createElementNS(_,"line");S.setAttribute("x1",i+(A-w)/(f-w)*(e-2*i)),S.setAttribute("x2",i+(A-w)/(f-w)*(e-2*i)),S.setAttribute("y1",(r-E)/2+E),S.setAttribute("y2",(r-E)/2),S.setAttribute("stroke","black");let v=document.createElementNS(_,"line");v.setAttribute("x1",i+(w-w)/(f-w)*(e-2*i)),v.setAttribute("x2",i+(d-w)/(f-w)*(e-2*i)),v.setAttribute("y1",r/2),v.setAttribute("y2",r/2),v.setAttribute("stroke","black");let N=document.createElementNS(_,"line");return N.setAttribute("x1",i+(p-w)/(f-w)*(e-2*i)),N.setAttribute("x2",i+(f-w)/(f-w)*(e-2*i)),N.setAttribute("y1",r/2),N.setAttribute("y2",r/2),N.setAttribute("stroke","black"),m.appendChild(x),m.appendChild(S),m.appendChild(v),m.appendChild(N),m}function __bubble_chart(t,e,r,i=400,l=200,s=40){let n=Math.max(...r),a=Math.min(...t),b=Math.max(...t),$=Math.min(...e),u=Math.max(...e),h=__generate_HSV_colors(t.length),o="http://www.w3.org/2000/svg",c=document.createElementNS(o,"svg");return c.setAttribute("width",i),c.setAttribute("height",l),c.setAttribute("viewBox",`0 0 ${i} ${l}`),t.forEach((t,g)=>{let d=l-s-(e[g]-$)/(u-$)*(l-2*s),A=r[g]/n*5+1,p=document.createElementNS(o,"circle");p.setAttribute("cx",s+(t-a)/(b-a)*(i-2*s)),p.setAttribute("cy",d),p.setAttribute("r",A),p.setAttribute("fill",h[g%h.length]),p.setAttribute("opacity","0.6"),c.appendChild(p)}),c}function __donut_chart(t,e,r=40,i=20,l=10){let s=e.reduce((t,e)=>t+e,0),n=0,a=r+l,b=r+l,$=__generate_HSV_colors(e.length),u="http://www.w3.org/2000/svg",h=document.createElementNS(u,"svg");return h.setAttribute("width",`${2*(r+l)}`),h.setAttribute("height",`${2*(r+l)}`),e.forEach((t,e)=>{let l=t/s*2*Math.PI,o=a+r*Math.cos(n),c=b+r*Math.sin(n),g=a+i*Math.cos(n),d=b+i*Math.sin(n);n+=l;let A=a+r*Math.cos(n),p=b+r*Math.sin(n),w=a+i*Math.cos(n),f=b+i*Math.sin(n),_=l>Math.PI?1:0,m=document.createElementNS(u,"path"),x=`M ${g} ${d} L ${o} ${c} A ${r} ${r} 0 ${_} 1 ${A} ${p} L ${w} ${f} A ${i} ${i} 0 ${_} 0 ${g} ${d} Z`;m.setAttribute("d",x),m.setAttribute("fill",$[e%$.length]),h.appendChild(m)}),h}function __line_chart(t,e,r=100,i=100,l=10){let s=Math.min(...e),n=__generate_HSV_colors(3),a="http://www.w3.org/2000/svg",b=document.createElementNS(a,"svg");b.setAttribute("width",r),b.setAttribute("height",i),b.setAttribute("viewBox",`0 0 ${r} ${i}`);let $=(r-2*l)/(t.length-1),u=(i-2*l)/(Math.max(...e)-s),h="M";e.forEach((t,e)=>{h+=`${l+e*$},${i-l-(t-s)*u} `});let o=document.createElementNS(a,"path");return o.setAttribute("d",h.trim()),o.setAttribute("stroke",n[0]),o.setAttribute("stroke-width","2"),o.setAttribute("fill","none"),b.appendChild(o),e.forEach((t,e)=>{let r=document.createElementNS(a,"circle");r.setAttribute("cx",l+e*$),r.setAttribute("cy",i-l-(t-s)*u),r.setAttribute("r",4),r.setAttribute("fill",n[1]),b.appendChild(r)}),b}function __pie_chart(t,e,r=100,i=10){let l=e.reduce((t,e)=>t+e,0),s=0,n=r+i,a=r+i,b=__generate_HSV_colors(e.length),$="http://www.w3.org/2000/svg",u=document.createElementNS($,"svg");return u.setAttribute("width",`${2*(r+i)}`),u.setAttribute("height",`${2*(r+i)}`),e.forEach((t,e)=>{let i=t/l*2*Math.PI,h=n+r*Math.cos(s),o=a+r*Math.sin(s);s+=i;let c=n+r*Math.cos(s),g=a+r*Math.sin(s),d=document.createElementNS($,"path"),A=`M ${n} ${a} L ${h} ${o} A ${r} ${r} 0 ${i>Math.PI?1:0} 1 ${c} ${g} Z`;d.setAttribute("d",A),d.setAttribute("fill",b[e%b.length]),u.appendChild(d)}),u}function __process_dom(){document.querySelectorAll(".ga-bar, .ga-box, .ga-bubble, .ga-donut, .ga-line, .ga-pie").forEach(t=>{let e=t.className.split(" "),r=256,i=256,l=[],s=[],n=[],a="bar",b=!1;e.forEach(t=>{t.startsWith("ga-xs-")&&(l=t.split("-").slice(2)),t.startsWith("ga-ys-")&&(s=t.split("-").slice(2).map(t=>parseFloat(t)).filter(t=>!isNaN(t))),t.startsWith("ga-zs-")&&(n=t.split("-").slice(2).map(t=>parseFloat(t)).filter(t=>!isNaN(t))),t.startsWith("ga-legend")&&(b=!0),"ga-bar"===t&&(a="bar"),"ga-box"===t&&(a="box"),"ga-bubble"===t&&(a="bubble"),"ga-donut"===t&&(a="donut"),"ga-line"===t&&(a="line"),"ga-pie"===t&&(a="pie"),"ga-2xs"===t&&(r=32,i=32),"ga-xs"===t&&(r=64,i=64),"ga-s"===t&&(r=128,i=128),"ga-l"===t&&(r=512,i=512),"ga-xl"===t&&(r=1024,i=1024),"ga-2xl"===t&&(r=2048,i=2048)});let $;"bubble"===a?($=__box_chart(l,r,i,r/10),b=!1):"bubble"===a?($=__bubble_chart(l,s=s.map(t=>parseFloat(t)).filter(t=>!isNaN(t)),n,r,i,r/10),b=!1):"donut"===a?$=__donut_chart(l,s,(r-2*(r/10))/2,(r-2*(r/10))/4,r/10):"line"===a?(b=!1,$=__line_chart(l,s=s.map(t=>parseFloat(t)).filter(t=>!isNaN(t)),r,i,r/10)):$="pie"===a?__pie_chart(l,s,(r-2*(r/10))/2,r/10):__bar_chart(l,s,r,i,r/10),t.replaceWith($),b&&$.parentNode.insertBefore(__generate_legend(l,__generate_HSV_colors(l.length),r/10,r/20),$.nextSibling)})}document.addEventListener("DOMContentLoaded",__process_dom);const observer=new MutationObserver(__process_dom);observer.observe(document.body,{childList:!0,subtree:!0});