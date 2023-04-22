import {
    concat,
    defaultTo,
    map,
    mergeRight,
    pipe,
    toString,
} from 'ramda';
import { WebSocket } from 'ws';
import Future from 'fluture';
import type {
    CreateGatewayParamsFunc,
    GatewayParams,
} from './types.js';
import { defaultGatewayParams } from './defaults.js';

export function connectWSAsFuture(addr: string) {
    const ws = new WebSocket(addr);

    return Future<Error, WebSocket>((rej, res) => {
        ws.on('error', rej);

        ws.once('open', () => {
            ws.off('error', rej);
            res(ws);
        });

        return () => ws.close();
    });
}

const createParamStringFromStrRecord = (params: Record<string, string>) => new URLSearchParams(params).toString();
const createParamString = pipe(
    map<
        Record<string, string | number>,
        Record<string, string>
    >(toString),
    createParamStringFromStrRecord,
);
export const createGatewayAddr: CreateGatewayParamsFunc = pipe(
    defaultTo({})<Partial<GatewayParams>>,
    mergeRight(defaultGatewayParams),
    createParamString,
    concat('wss://gateway.discord.gg/'),
);
