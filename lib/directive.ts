import { useDragToScroll } from './useDragToScroll'

export const dragToScroll = {
    mounted(el: any) {
        const { setup, cleanup } = useDragToScroll(el)
        setup()
        el._cleanup = cleanup
    },
    unmounted(el: any) {
        el._cleanup && el._cleanup()
    }
}