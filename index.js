const express = require('express');
const request = require('request-promise');
// accessingg express dependencies 
const app = express();
// Our port 
const PORT = process.env.PORT || 5000;
// ScraperAPI API key
// the Url for scraping using our API key

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
// returns our requests in (JS Object Notation)
app.use(express.json());
// Send text to our hosted server
app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API.');
});

// fetching product details // route 1
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        // request for specific product info
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        // sending our information back from the server in JSON format
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});
// route 2 // product reviews 
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        // request for specific product info
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        // sending our information back from the server in JSON format
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});
// route 3 // product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        // request for specific product info
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        // sending our information back from the server in JSON format
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});
// route 4 // search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        // request for specific product info
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        // sending our information back from the server in JSON format
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Logs our current port that our server is running with
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));