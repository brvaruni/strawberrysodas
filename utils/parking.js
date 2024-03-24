const axios = require('axios');

async function assignParking(PlateNum) {
    let json = JSON.stringify({
        "PlateNum": `${PlateNum}`
    });
    try {
        const response = await axios.post("http://localhost:5000/parking/in", json, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.slot;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
}

async function deleteParking(PlateNum) {
    let json = JSON.stringify({
        "PlateNum": `${PlateNum}`
    });
    try {
        const response = await axios.post("http://localhost:5000/parking/out", json, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = { assignParking, deleteParking };
