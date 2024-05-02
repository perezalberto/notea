"use client"

import React from "react"
import Link from "next/link"
import clsx from "clsx"
import { signOut, useSession } from "next-auth/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fas } from "@fortawesome/free-solid-svg-icons"

import BrandIcon from "@/components/icons/BrandIcon"
import Dropdown from "@/components/Dropdown"
import UserIcon from "@/components/icons/UserIcon"
import { useParams } from "next/navigation"
import TextButtonLink from "./TextButtonLink"

export default function Navbar({ links, position = "left", children }: {
	links?: { name?: string, icon: string, href?: string, onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }[],
	position: "left" | "right" | "top" | "bottom",
	children?: React.ReactNode
}) {
	const { data: session } = useSession()
	const { userId } = useParams()

	return (
		<div className={clsx("flex w-screen h-screen",{
			"flex-row": position === "left",
			"flex-col": position === "top",
			"flex-row-reverse": position === "right",
			"flex-col-reverse": position === "bottom"
		})}>
			<nav className={clsx(
				"flex gap-3 justify-between sticky items-center p-3 bg-neutral-100 dark:bg-neutral-900",
					{
						"flex-row h-20 w-screen": position === "top" || position === "bottom",
						"flex-col w-20 h-screen": position === "left" || position === "right",
					}
				)}>
				<div className={clsx("flex gap-3",{
					"flex-row": position === "top" || position === "bottom",
					"flex-col": position === "left" || position === "right"
				})}>
					<Link href={`/${userId}`} className="p-4">
						<BrandIcon />
					</Link>
					{links && links.length > 0 && <hr className={clsx("border-neutral-500/30 w-full", {
						"w-full": position === "left" || position === "right",
						"h-full": position === "top" || position === "bottom"
					})} />}
					{links && links.map((link) => (
						<Link key={link.name} href={link.href || "#"} onClick={link.onClick} className="p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-xl transition-all">
							<FontAwesomeIcon icon={fas["fa" + link.icon]} className="w-6 h-6 text-neutral-500 block" />
						</Link>
					))}
					<Link href={`/${userId}/group/create`} className="p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-xl transition-all">
						<FontAwesomeIcon icon={fas["faPlus"]} className="w-6 h-6 text-neutral-500 block" />
					</Link>
				</div>
				<Dropdown direction={
					position === "left" ? "right up" :
					position === "right" ? "left up" :
					position === "top" ? "bottom right" :
					position === "bottom" ? "top right" : "right up"
				} trigger={
					<a href="#" className="p-1 block">
						{session?.user.image
							? <img src={session?.user.image || ""} className="w-12 h-12 rounded-full" />
							: <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
								<UserIcon width={48} height={48} />
							</div>
						}
					</a>
				}>
					<div className="flex flex-col bg-neutral-200 dark:bg-neutral-800 rounded-xl w-44">
						<TextButtonLink href={`/${userId}/config`} icon="User" rounded="top">{session?.user.name}</TextButtonLink>
						<TextButtonLink href="#" onClick={() => signOut({ callbackUrl: "/" })} icon="ArrowRightFromBracket" rounded="bottom" color="red">Sign Out</TextButtonLink>
					</div>
				</Dropdown>
			</nav>
			<div className="overflow-y-auto grow">
				{children}
			</div>
		</div>
	)
}
