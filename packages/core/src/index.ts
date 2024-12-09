import CodePlayer from './components/index.vue';
import '@/style/global.less';
import '@/style/index.less';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { utoa, atou } from './utils/str';

export type { CodePlayerOptions } from './type';

export { utoa, atou };
export default CodePlayer;
