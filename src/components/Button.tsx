import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"


type Colors = "neutral" | "red" | "orange" | "yellow" | "green" | "blue"

type Props = {
	color?: Colors,
	icon?: string,
	rounded?: "all" | "left" | "right" | "top" | "bottom",
	className?: string,
	children: React.ReactNode,
	onClick?: () => void
}

export default function Button(props: Props) {
	return <button
		onClick={props.onClick}
		className={clsx(
			props.className,
			{
				"bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 hover:dark:bg-neutral-600": props.color === "neutral" || !props.color,
				"bg-red-400 dark:bg-red-600 hover:bg-red-500 hover:dark:bg-red-500": props.color === "red",
				"bg-orange-400 dark:bg-orange-600 hover:bg-orange-500 hover:dark:bg-orange-500": props.color === "orange",
				"bg-yellow-400 dark:bg-yellow-600 hover:bg-yellow-500 hover:dark:bg-yellow-500": props.color === "yellow",
				"bg-green-400 dark:bg-green-600 hover:bg-green-500 hover:dark:bg-green-500": props.color === "green",
				"bg-blue-400 dark:bg-blue-600 hover:bg-blue-500 hover:dark:bg-blue-500": props.color === "blue",
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
		</button>
}