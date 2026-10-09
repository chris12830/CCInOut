import Dashboard from "./dashboard";
import { requireChatGPTUser } from "./chatgpt-auth";
import { readWorkspace } from "@/lib/store";
export const dynamic = "force-dynamic";
export default async function Page() { const user=await requireChatGPTUser("/"); let initial=null; try{initial=await readWorkspace(user.userId);}catch(error){console.error("Attendance unavailable",error);} return <Dashboard initial={initial}/>; }
