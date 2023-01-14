<script src="html5-qrcode.min.js"></script>


function onScanSuccess(qrCodeMessage) {
    document.getElementById('result').innerHTML = '<span class="result">' + qrCodeMessage + '</span>';
}

function onScanError(errorMessage) {
        //handle scan error
}

var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
return message=html5QrcodeScanner.render(onScanSuccess, onScanError);
    
* router.get('/scanner', catchAsync(async(req, res) => {
    const objectId = BarCodeScanner();
    const student = await Student.findById(objectId);
    res.render('./students/profile', {student})
})) */

const BarCodeScanner = require('../utilities/BarcodeScanner');