import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

	return (
		<Navbar links={[
			{
				href: "/",
				icon: "Home",
				name: "Home"
			}
		]} position="left">
			<main className="w-full">
				{children}
			</main>
		</Navbar>
	)
}