// 读取dataSum.json文件
const data = require('./dataSum.json');
const current=data.data.data

/* 

 {
    title: '结算总数量', totalQtyCount
    dataIndex: 'totalQty',
    key: 'totalQty',
  },
  {
    title: '报支单总金额',
    dataIndex: 'totalBillAmt',
    key: 'totalBillAmt',
  },
  {
    title: '已付款金额', payApplyAmountCount
    dataIndex: 'paiedApplyAmt',
    key: 'paiedApplyAmt',
    width: 100,
  },
  {
    title: '含核销预付款',
    dataIndex: 'containCancelPrePayAmt',
    key: 'containCancelPrePayAmt',
    width: 100,
  },
  
*/
// containCavAmtCount: "28503817.22"
// netInvValueCount: "313175473.07"
// payApplyAmountCount: "41125503.6"
// totalMoneyCount: "321317884.16"
// totalQtyCount: "261481.8227"

// 计算总和
const totalQtyCount = current.reduce((acc, item) => {
    const totalQty = parseFloat(item.totalQty);
    return acc + (isNaN(totalQty) ? 0 : totalQty);
    }, 0);
console.log("🚀 ~ totalMoneyCount ~ 结算总数量:", totalQtyCount)

const totalMoneyCount = current.reduce((acc, item) => {
    const totalBillAmt = parseFloat(item.totalBillAmt);
    return acc + (isNaN(totalBillAmt) ? 0 : totalBillAmt);
    }, 0);
console.log("🚀 ~ totalMoneyCount ~ 报支单总金额:", totalMoneyCount)

const x = current.reduce((acc, item) => {
    const containCancelPrePayAmt = parseFloat(item.containCancelPrePayAmt);
    return acc + (isNaN(containCancelPrePayAmt) ? 0 : containCancelPrePayAmt);
    }, 0);
console.log("🚀 ~ totalMoneyCount ~ 报支单总金额:", x)

