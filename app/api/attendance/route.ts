import { getChatGPTUser } from "../../chatgpt-auth";
import { readWorkspace, mutateWorkspace } from "@/lib/store";
import { RuleError, type Action } from "@/lib/attendance";
export const dynamic = "force-dynamic";
const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{"Cache-Control":"no-store"}});
export async function GET(){const user=await getChatGPTUser();if(!user)return reply({error:"Sign in to open attendance."},401);try{return reply(await readWorkspace(user.userId));}catch(error){console.error("Attendance read failed",error);return reply({error:"Attendance is unavailable. Please try again."},503);}}
export async function POST(request:Request){
 const user=await getChatGPTUser();if(!user)return reply({error:"Sign in to update attendance."},401);
 const origin=request.headers.get("origin");if(origin&&origin!==new URL(request.url).origin)return reply({error:"This request is not allowed."},403);
 try {const raw=await request.text();if(raw.length>12000)return reply({error:"Request is too large."},413);const body=JSON.parse(raw);if(!Number.isInteger(body.revision)||!body.action||typeof body.action.type!=="string")return reply({error:"Invalid attendance request."},400);return reply(await mutateWorkspace(user.userId,body.revision,body.action as Action,user.displayName));}
 catch(error){if(error instanceof RuleError)return reply({error:error.message},error.status);if(error instanceof SyntaxError)return reply({error:"Invalid attendance request."},400);console.error("Attendance update failed",error);return reply({error:"Your change could not be saved. Please try again."},503);}
}
