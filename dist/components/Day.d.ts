import { JewishDay, BasicJewishDay } from '../utils/jewishDateUtils';
type __VLS_Props = {
    day: JewishDay;
    isHebrew?: boolean;
    selectedDay: BasicJewishDay | undefined;
    onClick: (day: BasicJewishDay) => void;
    onMouseOver?: (day: BasicJewishDay) => void;
    canSelect?: (day: BasicJewishDay) => boolean;
    customizeDayStyle?: (day: BasicJewishDay) => string;
    isRange?: boolean;
    startDay: BasicJewishDay | undefined;
    endDay: BasicJewishDay | undefined;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
