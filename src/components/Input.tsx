import clsx from 'clsx'
import React from 'react'

export default function Input(props: React.HTMLProps<HTMLInputElement> & {label?: string}) {
	const {className, label, ...rest} = props
	return (
		<label>
			{label && <span className="text-neutral-500 px-1">{label}</span>}
			<input className={clsx(
				"p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 outline-none w-full border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors",
				className
			)} {...rest}/>
		</label>
	)
}
