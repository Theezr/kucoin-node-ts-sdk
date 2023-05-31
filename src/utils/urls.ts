export const UserUrls = {
  getSubAccounts: '/api/v2/sub/user',
};

export const accountUrls = {
  listAccounts: '/api/v1/accounts',
  getAnAccount: '/api/v1/accounts',
  getAccountLedgers: '/api/v1/accounts/ledgers',
  getAccountSummaryInfo: '/api/v2/user-info',
  createSubAccount: '/api/v2/sub/user/created',
  getSubAccountSpotList: '/api/v1/sub/api-key',
  createSpotForSubAccount: '/api/v1/sub/api-key',
  modifySubAccountSpot: '/api/v1/sub/api-key/update',
  getAccountBalanceSubAccount: '/api/v1/sub-accounts',
  getPaginatedSubAccountInfo: '/api/v2/sub-accounts',
  getTheTransferable: '/api/v1/accounts/transferable',
  transferBetweenMasterAndSub: '/api/v2/accounts/sub-transfer',
  innerTransfer: '/api/v2/accounts/inner-transfer',
};

export const depositUrls = {
  createDepositAddress: '/api/v1/deposit-addresses',
  getDepositAddresses: '/api/v2/deposit-addresses',
  getDepositList: '/api/v1/deposits',
  getHistoricalDepositsList: '/api/v1/hist-deposits',
};

export const withdrawalUrls = {
  getWithdrawalsList: '/api/v1/withdrawals',
  getHistoricalWithdrawalsList: '/api/v1/hist-withdrawals',
  getWithdrawalQuotas: '/api/v1/withdrawals/quotas',
  applyWithdraw: '/api/v1/withdrawals',
  cancelWithdraw: '/api/v1/withdrawals',
};

export const tradeFeeUrls = {
  basicUserFee: '/api/v1/base-fee',
  actualFeeRateOfTradingPair: '/api/v1/trade-fees',
};

export const ordersUrl = {
  placeNewOrder: '/api/v1/orders',
  placeMarginOrder: '/api/v1/margin/order',
  placeBulkOrders: '/api/v1/orders/multi',
  cancelOrder: '/api/v1/orders',
  cancelSingleOrder: '/api/v1/order/client-order',
  cancelAllOrder: '/api/v1/orders',
  listOrders: '/api/v1/orders',
  recentOrders: '/api/v1/limit/orders',
  getAnOrder: '/api/v1/orders',
  getSingleActiveOrder: '/api/v1/order/client-order',
};

export const fillsUrls = {
  listFills: '/api/v1/fills',
  recentFills: '/api/v1/limit/fills',
};

export const stopOrderUrls = {
  placeNewOrder: '/api/v1/stop-order',
  cancelOrder: '/api/v1/stop-order',
  cancelOrders: '/api/v1/stop-order/cancel',
  getSingleOrderInfo: '/api/v1/stop-order',
  listStopOrders: '/api/v1/stop-order',
  getSingleOrder: '/api/v1/stop-order/queryOrderByClientOid',
  cancelSingleOrder: '/api/v1/stop-order/cancelOrderByClientOid',
};

export const symbolTickersUrls = {
  getSymbolsList: '/api/v2/symbols',
  getTicker: '/api/v1/market/orderbook/level1',
  getAllTickers: '/api/v1/market/allTickers',
  get24hrStats: '/api/v1/market/stats',
  getMarketList: '/api/v1/markets',
};

export const orderBookUrls = {
  getPartOrderBook: '/api/v1/market/orderbook/level2',
  getFullOrderBook: '/api/v3/market/orderbook/level2',
};

export const historiesUrls = {
  getTradeHistories: '/api/v1/market/histories',
  getKlines: '/api/v1/market/candles',
};

export const currenciesUrls = {
  getCurrencies: '/api/v1/currencies',
  getCurrencyDetail: '/api/v2/currencies',
  getFiatPrice: '/api/v1/prices',
};
