import { BasicJewishDay, BasicJewishDate } from '../utils/jewishDateUtils';
type __VLS_Props = {
    value?: BasicJewishDate | Date | {
        startDate: BasicJewishDate;
        endDate: BasicJewishDate;
    } | {
        startDate: Date;
        endDate: Date;
    } | null;
    isHebrew?: boolean;
    isRange?: boolean;
    canSelect?: (day: BasicJewishDay) => boolean;
    customizeDayStyle?: (day: BasicJewishDay) => string;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    select: (startDay: BasicJewishDay, endDay?: BasicJewishDay | undefined) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSelect?: ((startDay: BasicJewishDay, endDay?: BasicJewishDay | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
