import town from '../assets/medieval_rpg/maps/town_scene.json';
import field from '../assets/medieval_rpg/maps/field_scene.json';
import castle from '../assets/medieval_rpg/maps/castle_scene.json';

export type MapId = 'town' | 'field' | 'castle';
export type EnemyId = 'slime' | 'dragon' | 'dark_lord';
export interface MapObject { id:string; image:string; center:number[]; width:number; blocking:boolean; destination?:string }
export interface Actor { role:string; position:number[] }
export interface MapData { background:string; spawn:number[]; objects:MapObject[]; actor_spawns?:Actor[] }
export const maps:Record<MapId,MapData> = {town,field,castle};
export const root='/assets/medieval_rpg/';
export const enemies:Record<EnemyId,{name:string;hp:number;attack:number;defense:number;xp:number;gold:number;image:string;boss:boolean}>={
  slime:{name:'スライム',hp:19,attack:7,defense:2,xp:9,gold:8,image:'characters/slime/idle-1.png',boss:false},
  dragon:{name:'竜の番人',hp:95,attack:18,defense:7,xp:48,gold:55,image:'characters/dragon/idle-1.png',boss:true},
  dark_lord:{name:'魔王',hp:145,attack:24,defense:10,xp:100,gold:150,image:'characters/dark_lord/idle-1.png',boss:true}
};
export const potion={name:'回復薬',cost:12,heal:36};
export const dialogue:Record<string,string>={
  farmer:'北の城へ続く道にはスライムがいるよ。戦いで力をつけておくれ。',
  guard:'魔王城へ向かい、城内のドラゴンを倒さなければ魔王には会えない。',
  healer:'傷も魔力も癒やしましょう。何度でも立ち寄ってください。',
  shopkeeper:'回復薬は12Gです。旅の備えにどうぞ。'
};
