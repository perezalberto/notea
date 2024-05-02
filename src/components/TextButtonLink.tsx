import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import Link from "next/link"
import React from "react"


type Colors = "neutral" | "red" | "orange" | "yellow" | "green" | "blue"

type Props = {
	color?: Colors,
	icon?: string,
	rounded?: "all" | "left" | "right" | "top" | "bottom",
	className?: string,
	children: React.ReactNode,
	onClick?: (e: React.MouseEvent) => void,
	href?: string
}

export default function TextButtonLink(props: Props) {
	return <Link 
		href={props.href || "#"} 
		onClick={(e) => {
			props.href ?? e.preventDefault()
			props.onClick && props.onClick(e)
		}}
		className={clsx(
			props.className,
			{
				"hover:bg-neutral-400/50 hover:dark:bg-neutral-500/20 text-neutral-900 dark:text-neutral-300": props.color === "neutral" || !props.color,
				"hover:bg-red-300/50 hover:dark:bg-red-600/20 text-red-900 dark:text-red-300": props.color === "red",
				"hover:bg-orange-300/50 hover:dark:bg-orange-600/20 text-orange-900 dark:text-orange-300": props.color === "orange",
				"hover:bg-yellow-300/50 hover:dark:bg-yellow-600/20 text-yellow-900 dark:text-yellow-300": props.color === "yellow",
				"hover:bg-green-300/50 hover:dark:bg-green-600/20 text-green-900 dark:text-green-300": props.color === "green",
				"hover:bg-blue-300/50 hover:dark:bg-blue-600/20 text-blue-900 dark:text-blue-300": props.color === "blue",
			},
			{
				"rounded-xl": props.rounded === "all" || !props.rounded,
				"rounded-l-xl": props.rounded === "left",
				"rounded-r-xl": props.rounded === "right",
				"rounded-t-xl": props.rounded === "top",
				"rounded-b-xl": props.rounded === "bottom"
			},
			"px-4 py-2 transition-colors flex items-center gap-2 text-neutral-950 dark:text-neutral-50"
		)}>
			{ props.icon && <FontAwesomeIcon icon={fas[`fa${props.icon}`]} className="" style={{height: "0.8em"}} /> }
			{ props.children }
		</Link>
}