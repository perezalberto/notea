"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import BrandIcon from "./icons/BrandIcon";
import Button from "./Button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function HomePageNavbar() {
	const { data: session } = useSession()
	const { userId } = useParams()
	return (
		<div className="flex items-center justify-between p-4">
			<div className="flex gap-2 items-center">
				<BrandIcon width={30} height={30}/>
				<h1 className="text-3xl">Notea</h1>
			</div>
			<div className="flex gap-2 items-center">
				{
					session?.user && (
						<Link href={`/${userId}`} className="flex items-center gap-2 bg-neutral-500/30 pl-4 rounded-3xl">
							<div>{session.user.name}</div>
							<img src={session.user.image || ""} className="w-10 h-10 rounded-full" />
						</Link>
					)
				}
				{
					!session?.user && <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} icon="User">Sign In</Button>
				}
			</div>
		</div>
	)
}