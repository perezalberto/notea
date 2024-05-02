"use client"

import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import FormPage from "@/components/FormPage";
import IconSelect from "@/components/IconSelect";
import Input from "@/components/Input";
import { useParams } from "next/navigation";

export default function Create() {
	const { userId } = useParams()
	const formSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		let dataObject = {}
		const formdata = new FormData(e.target as HTMLFormElement)
		for(const [key, value] of formdata) {
			dataObject = {...dataObject, [key]: value}
		}
		console.log(dataObject)
	}
	return (
		<div className="p-4 m-auto max-w-screen-sm">
			<FormPage title="Create group" onSubmit={e => formSubmit(e)}>
				<div className="flex flex-row gap-3">
					<IconSelect value="Home" name="icon" />
					<div className="flex flex-col grow gap-3">
						<Input type="text" autoComplete="off" name="name" label="Name"/>
						<Input type="text" autoComplete="off" name="description" label="Description" />
					</div>
				</div>
				<div className="flex justify-between mt-3 gap-3">
					<ButtonLink href={`/${userId}`} icon="ArrowLeft">Back</ButtonLink>
					<Button icon="Plus" color="green">Create</Button>
				</div>
			</FormPage>
		</div>
	)
}