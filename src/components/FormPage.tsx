import clsx from 'clsx'
import React from 'react'

export default function FormPage({children, action, method, title, description, className, onSubmit}: {
	children: React.ReactNode,
	action?: string,
	method?: string,
	title?: string,
	className?: string,
	description?: string,
	onSubmit?: (e: React.FormEvent) => void,
}) {
  return (
	<div className={clsx('flex flex-col bg-neutral-100 dark:bg-neutral-900 gap-3 p-3 rounded-3xl', className)}>
		{title && <h2 className="text-xl px-1 text-neutral-800 dark:text-neutral-200">{title}</h2>}
		{description && <p className='text-neutral-800 dark:text-neutral-200'>{description}</p>}
		<form
			action={action}
			method={method}
			onSubmit={onSubmit}
			className='flex flex-col gap-3'>
			{children}
		</form>
	</div>
  )
}
