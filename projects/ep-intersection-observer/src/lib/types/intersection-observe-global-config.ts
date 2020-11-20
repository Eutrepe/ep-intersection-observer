import { IntersectionObserveConfig } from './intersection-observe-config';

export type IntersectionObserveGlobalConfig = {
  intersectionConfig?: IntersectionObserveConfig;
  epIoOnActive?: (...args: any[] | null) => void;
  epIoOnUnactive?: (...args: any[] | null) => void;
  epIoInvokeOnce?: boolean;
  epIoWaitFor?: string;
  epIoActiveClass?: string;
  epIoGroupName?: string;
  epIoRemoveClassAfterLeaving?: boolean;
};
