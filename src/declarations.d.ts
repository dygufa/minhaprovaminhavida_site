declare interface NodeModule {
	hot?: any;
}

declare module "*.scss" {
	const classes: { [key: string]: string | undefined };
	export default classes;
}
