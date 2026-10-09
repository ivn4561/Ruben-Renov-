// Limpieza del escaneo «Scaniverse 2026-10-08 101546.glb» (Ford Transit Custom L2).
// Uso: npm i @gltf-transform/core@4 && node tools/limpiar-mi-ford.mjs entrada.glb salida.glb
// Antes, reducir la textura: npx @gltf-transform/cli resize entrada.glb entrada_2k.glb --width 2048 --height 2048
// Los valores de centro, ángulo y piso se midieron sobre este escaneo; para otro escaneo hay que recalcularlos.
import { NodeIO } from '@gltf-transform/core';
const [,, inp, out] = process.argv;
const io = new NodeIO();
const doc = await io.read(inp);
const prim = doc.getRoot().listMeshes()[0].listPrimitives()[0];
const P = prim.getAttribute('POSITION').getArray(), T = prim.getAttribute('TEXCOORD_0').getArray(), I = prim.getIndices().getArray();
const n = P.length/3;
const mx=-0.211, mz=0.566, ang=79.79*Math.PI/180, fa=-0.0189, fb=0.0062, fc=0.0716;
const ax=Math.cos(ang), az=Math.sin(ang);
// floor normal tilt: plane y = fa x + fb z + fc  -> normal (-fa,1,-fb)/|..|
const nrm=[-fa,1,-fb]; const nl=Math.hypot(...nrm); nrm.forEach((v,i)=>nrm[i]=v/nl);
const Q = new Float32Array(n*3);
for (let i=0;i<n;i++){ const x=P[i*3],y=P[i*3+1],z=P[i*3+2];
  const h = (y-(fa*x+fb*z+fc))*nrm[1];           // distancia al piso
  const u=(x-mx)*ax+(z-mz)*az, v=-(x-mx)*az+(z-mz)*ax;
  Q[i*3]=u; Q[i*3+1]=h; Q[i*3+2]=v; }
const keep=[];
const LIM = { u: 3.0, v: 1.22, hmax: 2.12 };
for (let t=0;t<I.length;t+=3){
  const a=I[t],b=I[t+1],c=I[t+2]; let ok=true;
  for (const k of [a,b,c]){ const u=Q[k*3],h=Q[k*3+1],v=Q[k*3+2]; if(Math.abs(u)>LIM.u||Math.abs(v)>LIM.v||h<0.0||h>LIM.hmax){ok=false;break;} }
  if(!ok) continue;
  // quitar piso: triángulos casi horizontales y bajos
  const e1=[Q[b*3]-Q[a*3],Q[b*3+1]-Q[a*3+1],Q[b*3+2]-Q[a*3+2]], e2=[Q[c*3]-Q[a*3],Q[c*3+1]-Q[a*3+1],Q[c*3+2]-Q[a*3+2]];
  const cr=[e1[1]*e2[2]-e1[2]*e2[1], e1[2]*e2[0]-e1[0]*e2[2], e1[0]*e2[1]-e1[1]*e2[0]]; const L=Math.hypot(...cr)||1;
  const ny=Math.abs(cr[1]/L); const hm=(Q[a*3+1]+Q[b*3+1]+Q[c*3+1])/3;
  if (hm<0.10 && ny>0.8) continue;
  if (hm<0.035) continue;
  // restos de piso bajo la van: fuera de las ruedas, o por debajo del chasis
  const hmax=Math.max(Q[a*3+1],Q[b*3+1],Q[c*3+1]); const um=(Q[a*3]+Q[b*3]+Q[c*3])/3, vm=Math.abs((Q[a*3+2]+Q[b*3+2]+Q[c*3+2])/3);
  const nearWheel = Math.abs(um-(-1.718))<0.42 || Math.abs(um-1.513)<0.42;
  if (hmax<0.14 && (!nearWheel || vm<0.62)) continue;
  keep.push(a,b,c);
}
// componentes conectados
const parent=new Int32Array(n).map((_,i)=>i); const find=x=>{while(parent[x]!==x){parent[x]=parent[parent[x]];x=parent[x];}return x;};
const key=new Map(); for(let i=0;i<n;i++){ const k=Math.round(Q[i*3]*500)+','+Math.round(Q[i*3+1]*500)+','+Math.round(Q[i*3+2]*500); const j=key.get(k); if(j===undefined) key.set(k,i); else { parent[find(i)]=find(j); } }
for(let t=0;t<keep.length;t+=3){const a=find(keep[t]),b=find(keep[t+1]); parent[b]=a; const c=find(keep[t+2]); parent[c]=find(a);}
const size=new Map(); for(let t=0;t<keep.length;t+=3){const r=find(keep[t]); size.set(r,(size.get(r)||0)+1);}
const comps=[...size.entries()].sort((a,b)=>b[1]-a[1]); console.log('components', comps.length, 'top', comps.slice(0,8).map(c=>c[1]).join(','));
const minKeep = Math.max(1500, comps[0][1]*0.01);
const good=new Set(comps.filter(c=>c[1]>=minKeep).map(c=>c[0]));
const remap=new Int32Array(n).fill(-1); const NP=[],NT=[],NI=[];
for(let t=0;t<keep.length;t+=3){ if(!good.has(find(keep[t]))) continue; for(let k=0;k<3;k++){const v=keep[t+k]; if(remap[v]<0){remap[v]=NP.length/3; NP.push(Q[v*3],Q[v*3+1],Q[v*3+2]); NT.push(T[v*2],T[v*2+1]);} NI.push(remap[v]);} }
console.log('tris kept', NI.length/3, 'of', I.length/3, 'verts', NP.length/3);
prim.getAttribute('POSITION').setArray(new Float32Array(NP));
prim.getAttribute('TEXCOORD_0').setArray(new Float32Array(NT));
prim.getIndices().setArray(new Uint32Array(NI));
// extents
let mn=[1e9,1e9,1e9], mxv=[-1e9,-1e9,-1e9]; for(let i=0;i<NP.length;i+=3) for(let k=0;k<3;k++){mn[k]=Math.min(mn[k],NP[i+k]);mxv[k]=Math.max(mxv[k],NP[i+k]);}
console.log('extent u', mn[0].toFixed(3), mxv[0].toFixed(3), 'h', mn[1].toFixed(3), mxv[1].toFixed(3), 'v', mn[2].toFixed(3), mxv[2].toFixed(3));
await io.write(out, doc);
