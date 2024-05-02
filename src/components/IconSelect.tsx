"use client"

import { faIconsList } from '@/config/faIconsList.config'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function IconSelect(props: React.HTMLProps<HTMLInputElement> & { value?: string }) {
	const { type, className, value, ...rest } = props
	const [currentValue, setCurrentValue] = React.useState(value)

	const buttonClick = (e: React.MouseEvent) => {
		e.preventDefault()
		const target = e.currentTarget as HTMLButtonElement
		const newValue = target.getAttribute('data-value')
		setCurrentValue(newValue as string)
	}

	return (
		<label className="relative group w-fit h-fit p-4">
			<div className='flex items-center justify-center w-16 h-16'>
				<FontAwesomeIcon icon={fas[`fa${currentValue}`]} className='text-neutral-500 h-12' />
				<input type="text" defaultValue={currentValue} {...rest} className='w-0 h-0 opacity-0'/>
			</div>
			<div className='absolute top-full left-0 w-80 h-80 p-5 overflow-hidden hidden group-focus-within:block group-active:block bg-neutral-100 dark:bg-neutral-800 border-2 border-solid border-neutral-500/10 rounded-3xl'>
				<div className='overflow-y-scroll w-full h-full'>
				{
					faIconsList.map(icon => (
						 <button key={icon} className='w-16 h-16' data-value={icon} onClick={buttonClick}>
							<FontAwesomeIcon icon={fas[`fa${icon}`]} size='2x' className='text-neutral-500 p-3'/>
						</button>
					))
				}
				</div>
			</div>
		</label>
	)
}
