import { useState, useEffect } from 'react';
export interface Result { stage: string; qualified: boolean; note: string; }
const key='temuin-results-v4';
export function useMeetingResults(){
 const [results,setResults]=useState<Record<string,Result>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [error,setError]=useState('');
 useEffect(()=>{const reset=()=>setResults({});window.addEventListener('temuin-reset-results',reset);return ()=>window.removeEventListener('temuin-reset-results',reset)},[]);
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(results));setError('')}catch{setError('Hasil belum tersimpan di browser. Jangan tutup halaman ini.')}},[results]);
 return {results,error,save:(id:string,result:Result)=>setResults(old=>({...old,[id]:result}))};
}
export const stages:Record<string,string>={scheduled:'Belum berlangsung',followup:'Perlu tindak lanjut',proposal:'Proposal dikirim',won:'Kerja sama tercapai',lost:'Belum cocok',no_show:'Tidak hadir'};
