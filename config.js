module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5000,
    URL: process.env.BASE_URL || 'http://localhost:5000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://local_dev:QFuo32vZrmZGDX7d5fPr@ds149947.mlab.com:49947/api_auth'
}