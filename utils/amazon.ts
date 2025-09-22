var fs = require('fs');

const options = {method: 'GET', headers: {accept: 'application/json'}};


export async function fetchProductByName(name:String) {
    // fetch(`https://api.business.amazon.com/products/2020-08-26/products?keywords=${name}&productRegion=US&locale=en_US`, options)
    // .then(res => res.json())
    // .then(res => console.log(res))
    // .catch(err => console.error(err));

    // replacing the call with a static file object call to avoid setting up WireMock or an Amazon Business Developer account
    return getJSONMock()
}

export async function getJSONMock() {
    var obj = JSON.parse(fs.readFileSync('resources/amazonMock.json', 'utf8'));
    return obj;
}