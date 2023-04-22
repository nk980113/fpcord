interface OtherParams {
    encoding: 'json' | 'etf';
    compress?: 'zlib-stream';
}

/**
 * Parameters for WebSocket connection.
 * @deprecated Assign a newer gateway version, e.g. 9 or 10.
 */
export interface DeprecatedGatewayParams extends OtherParams {
    v: 6 | 7 | 8;
}

/**
 * Parameters for WebSocket connection.
 */
export interface AvailableGatewayParams extends OtherParams {
    v: 9 | 10;
}

/**
 * Parameters for WebSocket connection.
 */
export type GatewayParams = DeprecatedGatewayParams | AvailableGatewayParams;

export interface CreateGatewayParamsFunc {
    /**
     * Create parameters for WebSocket connection.
     */
    (params?: Partial<AvailableGatewayParams>): string;
    /**
     * Create parameters for WebSocket connection.
     * @deprecated Assign a newer gateway version, e.g. 9 or 10.
     */
    (params: DeprecatedGatewayParams): string;
}
