import { BasicJewishDay, BasicJewishDate } from '../utils/jewishDateUtils';
type __VLS_Props = {
    modelValue?: BasicJewishDate | Date | {
        startDate: BasicJewishDate;
        endDate: BasicJewishDate;
    } | {
        startDate: Date;
        endDate: Date;
    } | null;
    isHebrew?: boolean;
    canSelect?: (day: BasicJewishDay) => boolean;
    customizeDayStyle?: (day: BasicJewishDay) => string;
    isRange?: boolean;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    select: (startDay: BasicJewishDay, endDay?: BasicJewishDay | undefined) => any;
    "update:modelValue": (value: any) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSelect?: ((startDay: BasicJewishDay, endDay?: BasicJewishDay | undefined) => any) | undefined;
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    pickerRef: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
