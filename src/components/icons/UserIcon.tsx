export default function UserIcon({ width, height, color }: { width?: number, height?: number, color?: [string, string] }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width ? width : 24} height={height ? height : 24} fill="none" viewBox="0 0 24 24">
			<path fill={color ? color[0] : "#424242"} d="M2 19.273C2 15.256 4.582 12 9 12h6c4.418 0 7 3.256 7 7.273v.909C22 21.186 21.105 22 20 22H4c-1.105 0-2-.814-2-1.818v-.91Z" />
			<path fill={color ? color[1] : "#777"} fillRule="evenodd" d="M14 11.483c0-.677.368-1.287.82-1.79C15.548 8.876 16 7.747 16 6.5 16 4.015 14.21 2 12 2S8 4.015 8 6.5c0 1.248.451 2.377 1.18 3.192.452.504.82 1.114.82 1.79V12H9v.172a2 2 0 0 0 .586 1.414L10 14l1.293 1.293a1 1 0 0 0 1.414 0L14 14l.414-.414A2 2 0 0 0 15 12.172V12h-1v-.517Z" clipRule="evenodd" />
			<path fill={color ? color[0] : "#424242"} fillRule="evenodd" d="M8.024 7c.476 0 .896-.84 1.147-1.342C9.679 4.642 10.719 3.998 12 4c1.272.002 2.224.488 2.812 1.645C15.067 6.15 15.5 7 15.976 7c.016-.164.024-.331.024-.5C16 4.015 14.21 2 12 2 9.794 2 8.006 4.008 8 6.488v.025c0 .164.009.327.024.487Z" clipRule="evenodd" />
		</svg>
	)
}