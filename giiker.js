// var val;

function connect(){

    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['0000aadb-0000-1000-8000-00805f9b34fb']
    })
        .then(device => device.gatt.connect())
        .then(server => server.getPrimaryService('0000aadb-0000-1000-8000-00805f9b34fb'))
        .then(service =>  service.getCharacteristic('0000aadc-0000-1000-8000-00805f9b34fb'))
        .then(characteristic => {
            characteristic.startNotifications();
            characteristic.addEventListener(
                "characteristicvaluechanged",
                handleVal
            );
            return characteristic.readValue();})
        .then(value => {
            var side = ["", "B", "D", "L", "U", "R", "F"];
            var turn = ["", "", "2", "'"];
            var val = value.getInt8(16)
            console.log(side[Math.floor(val/16)]+turn[val%16]);
            stringSeq+=" "+side[Math.floor(val/16)]+turn[val%16];
        })
    // .catch(error => { console.log(error); });
}

function handleVal(event){
    var side = ["", "B", "D", "L", "U", "R", "F"];
    var turn = ["", "", "2", "'"];
    var val = event.target.value.getInt8(16)
    console.log(side[Math.floor(val/16)]+turn[val%16]);
    stringSeq+=" "+side[Math.floor(val/16)]+turn[val%16];
}

