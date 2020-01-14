const envConstants = {
    'production': 'http://localhost:3001',
    'localhost': 'http://localhost:3001',
}

if(process.env.NODE_ENV === 'production') {
    envConstants.production = 'http://api.react-charity.xyz/';
}

export default envConstants;