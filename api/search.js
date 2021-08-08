"use strict";
/*!
* @project      suggestify-serverless
* @author      	Max van der Schee <hello@maxvanderschee.nl>
* @build        1628425044640
* @release      1.0.0
* @copyright    Copyright (c) 2021 Max van der Schee <hello@maxvanderschee.nl>
*/const e=3,t=8;async function s(s,r){const n={match:[],alt:[]};let o=[];const l=t=>{((e,t)=>{if(!e.length)return t.length;if(!t.length)return e.length;const s=[];for(let r=0;r<=t.length;r++){s[r]=[r];for(let n=1;n<=e.length;n++)s[r][n]=0===r?n:Math.min(s[r-1][n]+1,s[r][n-1]+1,s[r-1][n-1]+(e[n-1]===t[r-1]?0:1))}return s[t.length][e.length]})(t.toLowerCase(),s)<=e&&n.alt.push(t.toLowerCase())};for(let e=0;e<r.length;e++)a=r[e],new RegExp(s.replace(/\W+/g,"|"),"i").test(a)&&n.match.push(a.toLowerCase()),l(r[e]);var a;const c=function(e,t){const s=[],r=new RegExp(t,"i"),n=new RegExp(`${t.replace(/\W+/g,"|")}`,"i"),o={},l=e.sort().filter((e=>{const t=r.exec(e);return!t||0!==t.index||(s.push(e),!1)})).filter((e=>!r.test(e)||(s.push(e),!1))).filter((e=>{const t=n.exec(e);return!t||(o[e]=t.index,!1)})),a=Object.keys(o).sort(((e,t)=>o[e]-o[t]));return[...s,...a,...l]}(n.match,s);return o=new Set([...c,...n.alt.sort()]),Promise.resolve([...o].slice(0,t))}const r=require("./items.json"),n=require("./suggestions.json"),o=require("lambda-rate-limiter")({interval:6e4,uniqueTokenPerInterval:500}),l=e=>e.lenght>=3?async function(e,s){const r=[],n=new RegExp(e.replace(/\W+/g,"|"),"i");for(let o=0;o<s.length&&(0===n.exec(s[o]).index&&r.push(s[o].toLowerCase()),r.length!==t);o++);return Promise.resolve(r.sort())}(e,r):s(e,r),a=e=>{const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&grave;","/":"&#x2F;"};return e.replace(/[&<>"'/`]/gi,(e=>t[e]))};var c,i=(c=async(e,t)=>{const{headers:s,body:r}=e,c=JSON.parse(r),i=c.search?a(c.search.trim()):null;try{await o.check(50,s["x-real-ip"])}catch(u){return t.status(429).send("Too Many Requests")}if(!i)return t.status(200).json({type:"suggestions",items:n,time:0});try{let e=process.hrtime();const s=await l(i.toLowerCase());let r=process.hrtime(e);return t.status(200).json({type:s.length?"results":"empty",items:s,time:(1e9*r[0]+r[1])/1e9})}catch(u){return t.status(500).send("Woopsie, we will look into it!")}},async(e,t)=>(t.setHeader("Access-Control-Allow-Origin","https://suggestify.maxvanderschee.nl/"),t.setHeader("Access-Control-Allow-Credentials",!0),t.setHeader("Access-Control-Allow-Methods","POST"),t.setHeader("Access-Control-Allow-Headers","X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"),await c(e,t)));module.exports=i;
