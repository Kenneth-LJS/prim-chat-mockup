import React, { Fragment, FunctionComponent } from 'react';
import classNames from 'classnames';

import styles from './demo-color.module.scss';
import demoStyles from './demo-common.module.scss';
import colorStyles from '../../styles/constants/color.module.scss';
import SiteHead from '../common/site-head';

const colors = [
    {
        key: 'baseColor',
        label: 'Base Color',
    },
    {
        key: 'primaryColor',
        label: 'Primary Color',
    },
    {
        key: 'secondaryColor',
        label: 'Secondary Color',
    },
    {
        key: 'highlightColorA',
        label: 'Highlight Color A',
    },
    {
        key: 'highlightColorB',
        label: 'Highlight Color B',
    },
    {
        key: 'highlightColorC',
        label: 'Highlight Color C',
    },
];
const colorShades = [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
];

const Page: FunctionComponent = () => {
    return (
        <Fragment>
            <SiteHead title={'Demo - Color'} noTitlePrefix={true} />
            <div className={classNames(demoStyles.container, styles.body)}>
                <h1 className={styles.title}>Colors</h1>

                <div className={styles.colorContainer}>
                    <h2 className={styles.header}>Palette</h2>
                    <div className={styles.colorBlocks}>
                        {colors.map((color, index) => (
                            <ColorBlock
                                key={index}
                                color={colorStyles[color.key]}
                                label={color.label}
                            />
                        ))}
                    </div>
                </div>

                {colors.map((color, index) => (
                    <div key={index} className={styles.colorContainer}>
                        <h2 className={styles.header}>{color.label}</h2>
                        <div className={styles.colorBlocks}>
                            {colorShades.map((colorShade, index) => (
                                <ColorBlock
                                    key={index}
                                    color={colorStyles[color.key + colorShade]}
                                    label={colorShade}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

type ColorBlockProps = {
    color: string;
    label: string;
};

const ColorBlock: FunctionComponent<ColorBlockProps> = (props) => {
    const { color, label } = props;
    return (
        <div className={styles.colorBlock} style={{ backgroundColor: color }}>
            <div className={styles.colorBlockText}>
                {label}
                <br />
                {color.toUpperCase()}
            </div>
        </div>
    );
};

export default Page;
