import { createContext } from 'react';

export type PlatformType = 'unknown' | 'website' | 'local';
export type PlatformMode = 'unknown' | 'development' | 'production';
export type Platform = {
    type: PlatformType;
    mode: PlatformMode;
};
const PlatformContext = createContext({
    type: 'unknown',
    mode: 'unknown',
} as Platform);
export const PlatformProvider = PlatformContext.Provider;

export default PlatformContext;
