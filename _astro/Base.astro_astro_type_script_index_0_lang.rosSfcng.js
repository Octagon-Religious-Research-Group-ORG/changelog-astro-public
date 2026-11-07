var e={night:{mode:0,base:`#100e1c`,inks:[`#8b6cf6`,`#e26db1`,`#4fd1c5`,`#e9be72`],scale:.5},prism:{mode:1,base:`#f5f3fa`,inks:[`#ffb3c7`,`#ffd9a0`,`#a8e3f5`,`#c9b8ff`],scale:.5},stone:{mode:2,base:`#ecebe6`,inks:[`#22408a`,`#a07a2c`,`#4d5566`,`#f7f6f2`],scale:.8}},t={still:0,gentle:.28,vivid:.75},n=`attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}`,r=`precision highp float;
uniform vec2 u_res;uniform float u_time;uniform vec2 u_mouse;uniform float u_stir;uniform float u_mode;
uniform vec3 u_base;uniform vec3 u_ink0;uniform vec3 u_ink1;uniform vec3 u_ink2;uniform vec3 u_ink3;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);
return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);}
float fbm(vec2 p){float v=0.0,a=0.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);
for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=0.5;}return v;}
vec3 ramp(float t){t=fract(t)*4.0;
if(t<1.0)return mix(u_ink0,u_ink1,smoothstep(0.0,1.0,t));
if(t<2.0)return mix(u_ink1,u_ink2,smoothstep(1.0,2.0,t));
if(t<3.0)return mix(u_ink2,u_ink3,smoothstep(2.0,3.0,t));
return mix(u_ink3,u_ink0,smoothstep(3.0,4.0,t));}
void main(){
vec2 uv=gl_FragCoord.xy/u_res;float asp=u_res.x/u_res.y;
vec2 p=vec2(uv.x*asp,uv.y)*2.2;vec2 m=vec2(u_mouse.x*asp,u_mouse.y)*2.2;
vec2 d=p-m;float sw=u_stir*2.6*exp(-dot(d,d)*2.4);float c=cos(sw),s=sin(sw);
p=m+mat2(c,-s,s,c)*d;float t=u_time;
vec2 q=vec2(fbm(p+vec2(0.0,0.07*t)),fbm(p+vec2(5.2,1.3)-0.05*t));
vec2 r=vec2(fbm(p+3.5*q+vec2(1.7,9.2)+0.12*t),fbm(p+3.5*q+vec2(8.3,2.8)-0.1*t));
float f=fbm(p+3.0*r);float bands=0.5+0.5*sin(f*14.0+r.x*6.0);
vec3 ink=ramp(f*1.3+r.y*0.8+q.x*0.4);vec3 col;
if(u_mode<0.5){float glow=pow(bands,6.0)*0.9+pow(f,3.0)*0.4;col=u_base+ink*glow+ink*0.06;}
else if(u_mode<1.5){col=mix(u_base,ink,0.5+0.38*bands);col=mix(col,vec3(1.0),0.18*pow(bands,4.0));}
else{float w=abs(sin(f*6.0+r.x*2.5));
float broad=1.0-smoothstep(0.0,0.28,w);float vein=1.0-smoothstep(0.0,0.045,w);
float fine=1.0-smoothstep(0.0,0.03,abs(sin(f*17.0+q.y*4.0)));
col=u_base-0.07*fbm(p*1.5+r);col=mix(col,mix(u_base,u_ink2,0.4),broad*0.4);
col=mix(col,u_ink0,vein*0.7);col=mix(col,u_ink1,fine*0.55*smoothstep(0.45,0.65,q.x));}
gl_FragColor=vec4(col,1.0);}`;function i(e){let t=parseInt(e.slice(1),16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]}var a=()=>{let e=document.documentElement.dataset;return{theme:e.theme??`night`,motion:e.motion??`gentle`}};function o(o){let s=o.getContext(`webgl`,{antialias:!1});if(!s){o.dataset.fallback=`true`;return}let c=(e,t)=>{let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n},l=s.createProgram();if(s.attachShader(l,c(s.VERTEX_SHADER,n)),s.attachShader(l,c(s.FRAGMENT_SHADER,r)),s.linkProgram(l),!s.getProgramParameter(l,s.LINK_STATUS)){o.dataset.fallback=`true`;return}s.useProgram(l),s.bindBuffer(s.ARRAY_BUFFER,s.createBuffer()),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),s.STATIC_DRAW);let u=s.getAttribLocation(l,`a`);s.enableVertexAttribArray(u),s.vertexAttribPointer(u,2,s.FLOAT,!1,0,0);let d=e=>s.getUniformLocation(l,e),f={res:d(`u_res`),time:d(`u_time`),mouse:d(`u_mouse`),stir:d(`u_stir`),mode:d(`u_mode`),base:d(`u_base`),ink0:d(`u_ink0`),ink1:d(`u_ink1`),ink2:d(`u_ink2`),ink3:d(`u_ink3`)},p=window,m=7.3,h=0,g={x:.62,y:.5,tx:.62,ty:.5},_=!0,v=0,y=performance.now(),b=()=>e[a().theme]??e.night,x=()=>{let e=b();o.width=Math.round(Math.min(1400,Math.max(1,o.clientWidth))*e.scale),o.height=Math.round(Math.max(1,o.clientHeight)*e.scale),s.viewport(0,0,o.width,o.height)},S=()=>{let e=b();s.uniform2f(f.res,o.width,o.height),s.uniform1f(f.time,m),s.uniform2f(f.mouse,g.x,g.y),s.uniform1f(f.stir,h),s.uniform1f(f.mode,e.mode),s.uniform3fv(f.base,i(e.base)),s.uniform3fv(f.ink0,i(e.inks[0])),s.uniform3fv(f.ink1,i(e.inks[1])),s.uniform3fv(f.ink2,i(e.inks[2])),s.uniform3fv(f.ink3,i(e.inks[3])),s.drawArrays(s.TRIANGLES,0,3)},C=e=>{v=0;let n=Math.min(.05,(e-y)/1e3);y=e;let r=t[a().motion]??0;m+=n*r,g.x+=(g.tx-g.x)*.12,g.y+=(g.ty-g.y)*.12,h*=.965,S(),_&&!document.hidden&&(r>0||h>.002)&&(v=requestAnimationFrame(C))},w=()=>{!v&&_&&!document.hidden&&(y=performance.now(),v=requestAnimationFrame(C))};p.addEventListener(`pointermove`,e=>{if(e.pointerType===`touch`||document.documentElement.dataset.cursor===`off`)return;let t=o.getBoundingClientRect(),n=(e.clientX-t.left)/t.width,r=1-(e.clientY-t.top)/t.height;h=Math.min(1,h+Math.hypot(n-g.tx,r-g.ty)*2.2),g.tx=n,g.ty=r,w()}),new IntersectionObserver(([e])=>{_=e.isIntersecting,w()}).observe(o),new ResizeObserver(()=>{x(),S()}).observe(o),new MutationObserver(()=>{x(),S(),w()}).observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`,`data-motion`]}),document.addEventListener(`visibilitychange`,w),x(),S(),w()}var s=document.getElementById(`marble`);s&&o(s);