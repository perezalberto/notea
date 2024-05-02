import { GroupRepository } from "@/lib/database/group/GroupRepository"

export async function GET(request: Request) {
	return Response.json({hola: "mundo"})
}