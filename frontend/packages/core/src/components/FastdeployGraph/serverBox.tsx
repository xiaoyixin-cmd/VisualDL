import React, {FunctionComponent, useEffect, useState} from 'react';
import styled from 'styled-components';
import ModelTables from './ModelTables';
import CPUTables from './CPUTables';

import {rem} from '~/utils/style';
const TableTitle = styled.div`
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 18px;
    font-weight: 900;
`;
const Buttons = styled.div`
    height: ${rem(36)};
    line-height: ${rem(36)};
    text-align: center;
    font-size: 16px;
    margin-left: 20px;
    width: 100px;
    color: white;
    background-color: var(--navbar-background-color);
`;
const ButtonContent = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
`;
const ButtonLeft = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    padding-bottom: 20px;
`;
const ButtonRight = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    padding-bottom: 20px;
`;
type ArgumentProps = {
    Datas: any;
    server_id: any;
    updatdDatas?: any;
};
const PUBLIC_PATH: string = import.meta.env.SNOWPACK_PUBLIC_PATH;
// type ArgumentProps = {

// };
console.log('PUBLIC_PATH', PUBLIC_PATH, PUBLIC_PATH + '/api/fastdeploy/fastdeploy_client');
const serverBox: FunctionComponent<ArgumentProps> = ({Datas, updatdDatas, server_id}) => {
    const [flag, setFlag] = useState(true);
    console.log('Datas', Datas);
    // useEffect(() => {
    //     updatdDatas();
    // }, []);
    //  Datas.metric
    return (
        <div>
            {flag ? (
                <div
                    style={{
                        whiteSpace: 'pre-wrap',
                        background: 'black',
                        color: 'white',
                        padding: '20px',
                        height: '650px',
                        overflowY: 'auto'
                    }}
                >
                    {Datas.text}
                </div>
            ) : (
                <div
                    style={{
                        whiteSpace: 'pre-wrap',
                        // background: 'black',
                        // color: 'white',
                        padding: '20px',
                        height: '650px',
                        overflowY: 'auto'
                    }}
                >
                    <div>
                        <TableTitle>表一:模型服务监控</TableTitle>
                        <ModelTables Datas={Datas?.metric?.Model}></ModelTables>
                    </div>
                    <div>
                        <TableTitle>表二:GPU监控</TableTitle>
                        <CPUTables Datas={Datas?.metric?.GPU}></CPUTables>
                    </div>
                </div>
            )}
            <ButtonContent>
                <ButtonLeft>
                    <Buttons
                        onClick={() => {
                            setFlag(true);
                        }}
                    >
                        日志
                    </Buttons>
                    <Buttons
                        onClick={() => {
                            setFlag(false);
                        }}
                    >
                        性能
                    </Buttons>
                </ButtonLeft>
                <ButtonRight>
                    <Buttons
                        onClick={() => {
                            const url = PUBLIC_PATH + `/api/fastdeploy/fastdeploy_client+?server_id=${server_id}`;
                            window.open(url);
                        }}
                    >
                        打开客户端
                    </Buttons>
                    <Buttons
                        onClick={() => {
                            updatdDatas();
                        }}
                    >
                        更新日志
                    </Buttons>
                </ButtonRight>
            </ButtonContent>
        </div>
    );
};

export default serverBox;
