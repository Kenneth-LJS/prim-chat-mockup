import React, { FunctionComponent, ImgHTMLAttributes, useContext } from 'react';
import PlatformContext from '../../context/platform-context';
import { toStaticResourceUrl } from '../../utils/url-utils';

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

const Image: FunctionComponent<ImageProps> = (props) => {
    const { src, ...otherProps } = props;
    const platform = useContext(PlatformContext);

    const normalizedSrc = toStaticResourceUrl(src, platform);
    const imgProps = { ...otherProps, src: normalizedSrc };
    return <img {...imgProps} />;
};

export default Image;
