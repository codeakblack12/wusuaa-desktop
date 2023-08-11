export const RECEIPT_HEADER = [
    {
        type: 'image',
        url: 'https://ik.imagekit.io/xztlkr1o2/Frame%201171277829.jpg?updatedAt=1691551530165',     // file path
        position: 'center',                                  // position of image: 'left' | 'center' | 'right'
        width: '60px',                                           // width of image in px; default: auto
        height: '60px',                                          // width of image in px; default: 50 or '50px'
    },
    {
        type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
        value: 'WUSUAA',
        style: {fontWeight: "700", textAlign: 'center', fontSize: "24px", marginTop: "20px"}
    },
]

export const RECEIPT_FOOTER = [
    {
        type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
        value: 'Thank you, Please visit agaiin',
        style: {fontWeight: "500", textAlign: 'center', fontSize: "10px", marginTop: "10px"}
    },
]