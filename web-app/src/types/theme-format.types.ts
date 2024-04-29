export interface IEventFormat {
    id: number;
    name: string;
}

export interface IEventTheme {
    id: number;
    name: string;
}


export interface IThemesAndFormats {
    formatList: IEventFormat[];
    themesList: IEventTheme[];
}