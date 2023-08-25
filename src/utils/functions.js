import 'intl';
import "intl/locale-data/jsonp/en-US";
import { RECEIPT_FOOTER, RECEIPT_HEADER } from './data';
import moment from "moment"

function truncateToDecimals(num, dec = 2) {
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
}

export function formatMoney(_amount, currency) {
    const amount = truncateToDecimals(parseFloat(_amount));

    if (currency === 'NGN') {
        return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        }).format(amount)?.replace(".00", "");
    }

    if (currency === 'GHS') {
        return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        }).format(amount)?.replace(".00", "");
    }

    return amount

}

export const firstLetterUppercase = (value) => {
    if(value && value.length > 1){
      return `${value[0].toUpperCase()}${value.slice(1)}`
    }

    return ""

}

const receiptBarcode = (barcode) => {
    return {
        type: 'barCode',
        value: barcode,
        height: 80,
        width: 2.5,
        displayValue: true,
        fontsize: 12,
    }
}

const receiptInformation = (data) => {
    return {
        type: 'table',
        // style the table
        style: {border: '0px solid #ddd'},
        // list of the columns to be rendered in the table header
        tableHeader: ['', ''],
        // multi dimensional array depicting the rows and columns of the table body
        tableBody: [
            // ['Date & Time:', "23 May, 2023, 10:34"],
            ['Date & Time:', moment(new Date()).format('DD MMM YYYY, h:mma')],
            ['Cashier:', data?.cashier],
            ['Customer:', data?.customer_name || "N/A"],
            ['Payment Method:', data?.payment_type || ''],
        ],
        // custom style for the table header
        tableHeaderStyle: { backgroundColor: '#000', color: 'white'},
        // custom style for the table body
        tableBodyStyle: {'border': '0.5px solid #ddd', alignContent: "left", textAlign: "left"},
        // custom style for the table footer
        tableFooterStyle: {backgroundColor: '#000', color: 'white'},
    }
}

const receiptItems = async (data) => {
    const items = await data?.items?.map((val) => {
        return [
            val?.category || '',
            val?.quantity || '',
            formatMoney(val?.price, data?.currency)
        ]
    })

    return {
        type: 'table',
        // style the table
        style: {border: '1px solid #000', marginTop: "20px"},
        // list of the columns to be rendered in the table header
        tableHeader: ['Item', 'Qty', 'Amount'],
        // multi dimensional array depicting the rows and columns of the table body
        tableBody: [...items,
            [`NHIL/...(${ data?.covidVatValue || "0"}%)`, '-', formatMoney(data?.covidVat, data?.currency)],
            [`VAT(${ data?.vatValue || "0"}%)`, '-', formatMoney(data?.vat || 0, data?.currency)],
        ],
        tableFooter: ['Total', '', formatMoney(data?.total, data?.currency)],
        // custom style for the table header
        tableHeaderStyle: { backgroundColor: '#000', color: "#000"},
        // custom style for the table body
        tableBodyStyle: {'border': '1px solid #000', alignContent: "left", textAlign: "left"},
        // custom style for the table footer
        tableFooterStyle: {backgroundColor: '#000', color: 'white', color: "#000"},
    }
}

export const generateReceipt = async (data) => {
    const header = RECEIPT_HEADER
    const information = await receiptInformation(data)
    const items = await receiptItems(data)
    const barcode = await receiptBarcode(data?.uid)
    return [
        ...header,
        information,
        items,
        barcode,
        ...RECEIPT_FOOTER
    ]
}