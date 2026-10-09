import { env } from "cloudflare:workers";
import { seedState, applyAction, RuleError, type Action, type State } from "./attendance";
type Row={revision:number;data:string};
function db(){const binding=(env as unknown as {DB?:D1Database}).DB;if(!binding)throw new Error("Attendance storage is unavailable");return binding;}
export async function readWorkspace(ownerId:string):Promise<{state:State;revision:number}>{
 const database=db();let row=await database.prepare("SELECT revision, data FROM attendance_workspaces WHERE owner_id = ?").bind(ownerId).first<Row>();
 if(!row){const seed=seedState();await database.prepare("INSERT OR IGNORE INTO attendance_workspaces (owner_id, revision, data, updated_at) VALUES (?, 0, ?, ?)").bind(ownerId,JSON.stringify(seed),new Date().toISOString()).run();row=await database.prepare("SELECT revision, data FROM attendance_workspaces WHERE owner_id = ?").bind(ownerId).first<Row>();}
 if(!row)throw new Error("Attendance storage could not load");return {state:JSON.parse(row.data),revision:row.revision};
}
export async function mutateWorkspace(ownerId:string,revision:number,action:Action,actor:string){
 const current=await readWorkspace(ownerId);if(current.revision!==revision)throw new RuleError("Attendance changed on another screen. Refresh and try again.",409);
 const next=applyAction(current.state,action,actor);const result=await db().prepare("UPDATE attendance_workspaces SET data = ?, revision = revision + 1, updated_at = ? WHERE owner_id = ? AND revision = ?").bind(JSON.stringify(next),new Date().toISOString(),ownerId,revision).run();
 if(result.meta.changes!==1)throw new RuleError("Attendance changed on another screen. Refresh and try again.",409);
 return {state:next,revision:revision+1};
}
