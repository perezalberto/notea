"use client"

import clsx from "clsx";
import { useState } from "react";

interface Props {
	trigger: React.ReactNode,
	children: React.ReactNode,
	direction?: "left up" | "left down" | "right up" | "right down" | "left" | "right" | "bottom left" | "bottom right" | "top left" | "top right" | "bottom" | "top"
}

export default function Dropdown({trigger, children, direction}: Props) {
	const [open, setOpen] = useState(false)
	
	return (
		<div className="relative w-fit h-fit">
			<div className="w-fit h-fit cursor-pointer" onClick={() => setOpen(true)}>
				{trigger}
			</div>
			{ open && 
				<>
					<div className="fixed left-0 top-0 bottom-0 right-0 cursor-default" onClick={() => setOpen(false)}></div>
					<div className={clsx("absolute z-10", {
						"bottom-0 left-[calc(100%+0.25rem)]": "right up" === direction,
						"top-0 left-[calc(100%+0.25rem)]": "right down" === direction,
						"bottom-0 -translate-x-[calc(100%+0.25rem)]": "left up" === direction,
						"top-0 -translate-x-[calc(100%+0.25rem)]": "left down" === direction,
						"top-1/2 -translate-y-1/2 -translate-x-[calc(100%+0.25rem)]": "left" === direction,
						"top-1/2 -translate-y-1/2 left-[calc(100%+0.25rem)]": "right" === direction,
						"top-[calc(100%+0.25rem)] left-0": "bottom left" === direction,
						"top-[calc(100%+0.25rem)] right-0": "bottom right" === direction,
						"bottom-[calc(100%+0.25rem)] left-0": "top left" === direction,
						"bottom-[calc(100%+0.25rem)] right-0": "top right" === direction,
						"top-[calc(100%+0.25rem)] left-1/2 -translate-x-1/2": "bottom" === direction,
						"-translate-y-[calc(100%+0.25rem)] -top-full left-1/2 -translate-x-1/2": "top" === direction,
					})} onClick={() => setOpen(false)}>
						{children}
					</div>
				</>
			}
		</div>
	)
}