import React, { Fragment, FunctionComponent } from 'react';
import classNames from 'classnames';

import styles from './demo-typography.module.scss';
import demoStyles from './demo-common.module.scss';
import SiteHead from '../common/site-head';

const PARAGRAPH_STR_1 = [
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro iste fuga facilis provident inventore voluptas explicabo libero in excepturi distinctio. Quasi iure possimus, veritatis est reprehenderit nemo? Non, corrupti velit!',
    'Qui quidem architecto omnis similique commodi placeat, quaerat ullam maxime excepturi, quis quia repudiandae porro ipsum tenetur, eaque itaque quasi expedita et? Possimus modi dolorem architecto deserunt magnam et officia!',
    'Consequuntur reiciendis modi esse numquam ut in obcaecati magni beatae odit. Quos illum omnis expedita adipisci iste nihil vitae non, eligendi deserunt eius, itaque, officia dignissimos ut possimus quia laborum.',
].join(' ');

const PARAGRAPH_STR_2 = [
    'Etiam vel gravida tellus, non placerat mauris. Nunc non diam maximus, consectetur lacus quis, congue diam. Aenean et tempus urna, nec dapibus odio. Nam id placerat magna. Etiam nulla ante, iaculis eu elementum volutpat, sodales sit amet nisl. Donec sit amet sem vitae enim vehicula accumsan.',
    'Aliquam ac justo nunc. Ut aliquet nibh at metus lacinia aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum eu laoreet metus. Donec et justo condimentum, mattis dui vel, dictum lacus.',
].join(' ');

const Page: FunctionComponent = () => {
    return (
        <Fragment>
            <SiteHead title={'Demo - Typography'} noTitlePrefix={true} />
            <div className={classNames(demoStyles.container, styles.body)}>
                <div className={styles.title}>Title: Typography Examples</div>
                <p>{PARAGRAPH_STR_1}</p>
                <p>{PARAGRAPH_STR_2}</p>
                <h1 className={styles.header1}>
                    Heading 1: This functions as a section header
                </h1>
                <p>{PARAGRAPH_STR_1}</p>
                <p>{PARAGRAPH_STR_2}</p>
                <h2 className={styles.header2}>
                    Heading 2: Section subheaders look like this
                </h2>
                <p>{PARAGRAPH_STR_1}</p>
                <p>{PARAGRAPH_STR_2}</p>
                <h3 className={styles.header3}>Heading 3: The headers are getting smaller</h3>
                <p>{PARAGRAPH_STR_1}</p>
                <p>{PARAGRAPH_STR_2}</p>
                <h4 className={styles.header4}>
                    Heading 4: Smaller and smaller still
                </h4>
                <p>{PARAGRAPH_STR_1}</p>
                <p>{PARAGRAPH_STR_2}</p>
                <h5 className={styles.header5}>
                    Heading 5: Almost there!
                </h5>
                <p>{PARAGRAPH_STR_1}</p>
                <p>{PARAGRAPH_STR_2}</p>
                <h6 className={styles.header6}>
                    Heading 6: Lowest level header
                </h6>
                <p>{PARAGRAPH_STR_1}</p>
                <p>{PARAGRAPH_STR_2}</p>
                <div className={styles.title}>Title: Typography Examples</div>
                <h1 className={styles.header1}>
                    Heading 1: This functions as a section header
                </h1>
                <h2 className={styles.header2}>
                    Heading 2: Section subheaders look like this
                </h2>
                <h3 className={styles.header3}>Heading 3: The headers are getting smaller</h3>
                <h4 className={styles.header4}>
                    Heading 4: Smaller and smaller still
                </h4>
                <h5 className={styles.header5}>
                    Heading 5: Almost there!
                </h5>
                <h6 className={styles.header6}>
                    Heading 6: Lowest level header
                </h6>
            </div>
        </Fragment>
    );
};

export default Page;
