import { axiosWithoutAuth } from '@/api/interseptors';
import { IThemesAndFormats } from '@/types/theme-format.types';

export const themesFormatsService = {
    async getThemesAndFormats(){
        try {
            const { data: themes } = await axiosWithoutAuth.get('/event/themes');
            const { data: formats } = await axiosWithoutAuth.get('/event/formats');
            const themesAndFormats: IThemesAndFormats = {
                themesList: themes,
                formatList: formats
            }
            return themesAndFormats
        } catch (error) {
            console.log(error);
        }
    }
}