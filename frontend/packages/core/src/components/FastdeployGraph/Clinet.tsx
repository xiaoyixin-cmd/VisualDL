import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {rem} from '~/utils/style';
const PUBLIC_PATH: string = import.meta.env.SNOWPACK_PUBLIC_PATH;
// type ArgumentProps = {

// };
const serverBox: FunctionComponent = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%'
            }}
        >
            <iframe
                style={{
                    width: '100%',
                    height: '100%'
                }}
                src={PUBLIC_PATH + 'app/api/fastdeploy/create_fastdeploy_client'}
                // src={'https://www.baidu.com/'}
                frameBorder={0}
                scrolling="no"
                marginWidth={0}
                marginHeight={0}
            ></iframe>
        </div>
    );
};

export default serverBox;