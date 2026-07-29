import { makePage } from '@keystatic/astro/ui';
import config from '../../keystatic.config';

// client:only 하이드레이션이 모듈 참조를 필요로 해서, 컴포넌트를 별도 모듈로 내보낸다.
export const Keystatic = makePage(config);
