import { enemies, type EnemyId, type MapId, maps, potion } from './data';

export interface SaveState {version:1;level:number;xp:number;hp:number;mp:number;gold:number;potions:number;map:MapId;x:number;y:number;dragonDefeated:boolean;gameCleared:boolean}
export const saveKey='dawn-rpg-save-v1';
export const maxHp=(s:SaveState)=>42+(s.level-1)*13;
export const maxMp=(s:SaveState)=>12+(s.level-1)*5;
export const attack=(s:SaveState)=>10+(s.level-1)*4;
export const defense=(s:SaveState)=>3+(s.level-1)*2;
export const nextXp=(level:number)=>level*level*5;
export function fresh():SaveState {return {version:1,level:1,xp:0,hp:42,mp:12,gold:20,potions:2,map:'town',x:626,y:1080,dragonDefeated:false,gameCleared:false}}
export function valid(s:unknown):s is SaveState {if(!s||typeof s!=='object')return false;const a=s as Record<string,unknown>;return a.version===1&&Number.isInteger(a.level)&&Number(a.level)>=1&&Number(a.level)<=99&&['town','field','castle'].includes(String(a.map))&&['xp','hp','mp','gold','potions','x','y'].every(k=>typeof a[k]==='number'&&Number.isFinite(a[k])&&Number(a[k])>=0)&&typeof a.dragonDefeated==='boolean'&&typeof a.gameCleared==='boolean'}
export function load():SaveState|null {try {const s=JSON.parse(localStorage.getItem(saveKey)||'null');if(!valid(s))return null;const m=maps[s.map];const blocked=m.objects.some(o=>o.blocking&&o.id!=='gatehouse'&&o.id!=='altar'&&Math.abs(s.x-o.center[0])<o.width*.275+15&&Math.abs(s.y-(o.center[1]+o.width*.15))<Math.min(55,o.width*.22)/2+12);const actor=(m.actor_spawns||[]).some(a=>Math.hypot(s.x-a.position[0],s.y-a.position[1])<43);if(s.x<34||s.x>1220||s.y<34||s.y>1220||blocked||actor||(s.map==='castle'&&!s.dragonDefeated&&s.y<635)){s.x=m.spawn[0];s.y=m.spawn[1]}s.hp=Math.min(s.hp,maxHp(s));s.mp=Math.min(s.mp,maxMp(s));return s}catch{return null}}
export function save(s:SaveState){localStorage.setItem(saveKey,JSON.stringify(s))}
export function gain(s:SaveState,id:EnemyId):string {const e=enemies[id];s.xp+=e.xp;s.gold+=e.gold;let out=`${e.xp}経験値と${e.gold}Gを得た。`;while(s.xp>=nextXp(s.level)){s.level++;s.hp=maxHp(s);s.mp=maxMp(s);out+=` レベル${s.level}になった！ HPとMPが全回復。`}return out}
export function usePotion(s:SaveState):string {if(s.potions<=0)return '回復薬を持っていない。';if(s.hp>=maxHp(s))return 'HPは満タンだ。';s.potions--;const n=Math.min(potion.heal,maxHp(s)-s.hp);s.hp+=n;return `回復薬を使い、HPが${n}回復した。`}
export function damage(power:number,guard:number){return Math.max(1,power-guard+Math.floor(Math.random()*5)-2)}
