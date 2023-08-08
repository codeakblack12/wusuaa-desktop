let { remote } = require("electron");
const { PosPrinter } = remote.require("electron-pos-printer");

function print_receipt(data){
    try {
        const options = {
            preview: false,
            margin: "0 0 0 0",
            copies: 1,
            timeOutPerLine: 1000,
            silent: true,
            pageSize: '80mm'
        }

        PosPrinter.print(data, options)
        .then(() => {
        //   alert("Done printing")
        })
        .catch((error) => {
          alert(error);
        });

    } catch (error) {
        alert(error)
    }
}