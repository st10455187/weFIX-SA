import reportsSeed from '../data/reportsSeed.json';
import {generateId} from './helpers';


let store = {
reports: [...reportsSeed]
};


export function getAllReports(){
return store.reports;
}


export function getReportById(id){
return store.reports.find(r=>r.id===id);
}


export function addReport(payload){
const newReport = { ...payload, id: generateId('r'), status: 'Pending', createdAt: new Date().toISOString() };
store.reports.unshift(newReport);
return newReport;
}


export function updateReport(id, patch){
const idx = store.reports.findIndex(r=>r.id===id);
if(idx===-1) return null;
store.reports[idx] = {...store.reports[idx], ...patch};
return store.reports[idx];
}