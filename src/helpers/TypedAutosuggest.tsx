import { AutoComplete } from "material-ui";

export { AutoComplete as StaticAutoComplete } from "material-ui";

export interface DataSourceConfig<DataItem> {
	text: keyof DataItem;
	value: keyof DataItem;
}

export function autocompleteOfType<DataItem>() {
	return (AutoComplete as any) as new () => AutoComplete<DataItem>;
}
