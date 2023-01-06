/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef, forwardRef, ForwardRefRenderFunction} from 'react';
import styled from 'styled-components';
import ModelTables from './ModelTables';
import CPUTables from './CPUTables';
import ServerConfig from './ServerConfig';
import {fetcher} from '~/utils/fetch';
import {backgrounds, rem} from '~/utils/style';
import {toast} from 'react-toastify';
// import type {left} from '@antv/x6/lib/registry/port-label-layout/side';
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
    border: 1px solid;
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
    .backgrounds {
        background-color: var(--navbar-background-color);
        color: white;
        border: none;
    }
`;
const ButtonRight = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    padding-bottom: 20px;
`;
type ArgumentProps = {
    server_id: any;
    Flag: number;
    onEdit: () => any;
};
const PUBLIC_PATH: string = import.meta.env.SNOWPACK_PUBLIC_PATH;
// type ArgumentProps = {

// };
export type serverBoxRef = {
    outDatas(type: number): void;
};

console.log('PUBLIC_PATH', PUBLIC_PATH, PUBLIC_PATH + '/api/fastdeploy/fastdeploy_client');
const ServerBox: ForwardRefRenderFunction<serverBoxRef, ArgumentProps> = ({Flag, server_id, onEdit}) => {
    const [flag, setFlag] = useState(0);
    const [Datas, setDatas] = useState<any>({
        text: '',
        lengths: 0,
        metric: null
    });
    const [configs, setConfigs] = useState<any>();
    useEffect(() => {
        if (Flag === undefined) {
            return;
        }
        isAlive();
    }, [Flag]);
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setCount(count + 1);
    //     }, 10000);
    //     console.log('更新了', timer);
    //     return () => clearInterval(timer);
    // }, [count]);
    //  Datas.metric
    const isAlive = () => {
        const serverId = server_id;
        // const length = Datas.text.length;
        fetcher(`/fastdeploy/check_server_alive?server_id=${serverId}`, {
            method: 'GET'
        }).then(
            (res: any) => {
                console.log('check_server_alive', res);
                outDatas();
            },
            res => {
                console.log('error_check_server_alive', res);
            }
        );
    };
    const outDatas = () => {
        const serverId = server_id;
        const length = Datas.text.length;
        fetcher(`/fastdeploy/get_server_output?server_id=${serverId}` + `&length=${length}`, {
            method: 'GET'
        }).then(
            (res: any) => {
                console.log('get_server_output', res);
                metricDatas(serverId, res);
                getServe(serverId);
            },
            res => {
                console.log('get_server_output', res);
            }
        );
    };
    const clickOutDatas = () => {
        const serverId = server_id;
        const length = Datas.text.length;
        fetcher(`/fastdeploy/get_server_output?server_id=${serverId}` + `&length=${length}`, {
            method: 'GET'
        }).then(
            (res: any) => {
                console.log('get_server_output', res);
                metricDatas(serverId, res);
                getServe(serverId);
                toast.success(`${serverId}更新日志和性能数据成功`, {
                    autoClose: 2000
                });
            },
            res => {
                console.log('get_server_output', res);
            }
        );
    };
    const metricDatas = async (serverId: number, texts: any) => {
        await fetcher(`/fastdeploy/get_server_metric?server_id=${serverId}`, {
            method: 'GET'
        }).then(
            (res: any) => {
                console.log('get_server_metric', res);
                setDatas({
                    ...Datas,
                    text: Datas.text + texts,
                    lengths: Datas.text.length + texts.length,
                    metric: res
                });
            },
            res => {
                console.log('get_server_output', res);
            }
        );
    };
    const getServe = async (serverId: number) => {
        await fetcher(`/fastdeploy/get_server_config?server_id=${serverId}`, {
            method: 'GET'
        }).then(
            (res: any) => {
                console.log('get_server_config', res);
                setConfigs(res);
            },
            res => {
                console.log('get_server_output', res);
            }
        );
    };
    const cbRef: any = useRef();
    useEffect(() => {
        cbRef.current = outDatas;
    });
    useEffect(() => {
        const callback = () => {
            cbRef.current?.();
        };
        const timer = setInterval(() => {
            callback();
        }, 10000);
        return () => clearInterval(timer);
    }, []);
    // useImperativeHandle(ref, () => ({
    //     outData(serverId: number) {
    //         outDatas(serverId);
    //     }
    // }));
    return (
        <div>
            {flag === 0 ? (
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
            ) : flag === 1 ? (
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
                        <TableTitle>模型服务监控</TableTitle>
                        <ModelTables Datas={Datas?.metric?.Model}></ModelTables>
                    </div>
                    <div>
                        <TableTitle>GPU监控</TableTitle>
                        <CPUTables Datas={Datas?.metric?.GPU}></CPUTables>
                    </div>
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
                    <ServerConfig serverId={server_id} modelData={configs}></ServerConfig>
                </div>
            )}
            <ButtonContent>
                <ButtonLeft>
                    <Buttons
                        className={flag === 0 ? 'backgrounds' : ''}
                        onClick={() => {
                            setFlag(0);
                        }}
                    >
                        日志
                    </Buttons>
                    <Buttons
                        className={flag === 1 ? 'backgrounds' : ''}
                        onClick={() => {
                            setFlag(1);
                        }}
                    >
                        性能
                    </Buttons>
                    <Buttons
                        className={flag === 2 ? 'backgrounds' : ''}
                        onClick={() => {
                            setFlag(2);
                        }}
                    >
                        模型库配置
                    </Buttons>
                </ButtonLeft>
                <ButtonRight>
                    <Buttons
                        onClick={() => {
                            const url = PUBLIC_PATH + `/api/fastdeploy/fastdeploy_client?server_id=${server_id}`;
                            window.open(url);
                        }}
                    >
                        打开客户端
                    </Buttons>
                    <Buttons onClick={onEdit}>关闭服务</Buttons>
                    <Buttons
                        onClick={() => {
                            clickOutDatas();
                        }}
                    >
                        更新数据
                    </Buttons>
                </ButtonRight>
            </ButtonContent>
        </div>
    );
};

export default forwardRef(ServerBox);
