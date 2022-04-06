import React, { forwardRef, useContext, VideoHTMLAttributes } from 'react';
import PlatformContext from '../../context/platform-context';
import { toStaticResourceUrl } from '../../utils/url-utils';

type VideoProps = VideoHTMLAttributes<HTMLVideoElement>;

const Video = forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
    const { src, children, ...otherProps } = props;
    const platform = useContext(PlatformContext);

    const normalizedSrc = toStaticResourceUrl(src, platform);
    const videoProps = { ...otherProps, src: normalizedSrc };

    return <video ref={ref} {...videoProps} >{children}</video>;
});

export default Video;
