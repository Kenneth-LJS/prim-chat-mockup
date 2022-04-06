import React, { forwardRef, ForwardRefExoticComponent, JSXElementConstructor, PropsWithoutRef, RefAttributes } from 'react';

import styles from './footer.module.scss';

type FooterProps = {
    component?: JSXElementConstructor<any> | keyof JSX.IntrinsicElements;
};

const Footer: ForwardRefExoticComponent<PropsWithoutRef<FooterProps> & RefAttributes<any>> = forwardRef((props, ref) => {
    const { component: InputComponent } = props;

    let elem = (<div className={styles.footerContent}>
        FOOTER
    </div>);

    elem = InputComponent ? (
        <InputComponent className={styles.footer} ref={ref}>
            {elem}
        </InputComponent>
    ) : (
        <footer className={styles.footer} ref={ref}>
            {elem}
        </footer>
    );
    
    return elem;
});

export default Footer;
