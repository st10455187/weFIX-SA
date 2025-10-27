export function generateId(prefix = 'r'){
// simple unique id (not cryptographic) useful for demo
return `${prefix}_${Date.now()}_${Math.floor(Math.random()*10000)}`;
}


export function formatDateISO(iso){
const d = new Date(iso);
if(isNaN(d)) return iso;
return d.toLocaleString();
}


export function toTitleCase(s=''){
return s.replace(/\w\S*/g, (w)=> w.charAt(0).toUpperCase()+w.substr(1).toLowerCase());
}