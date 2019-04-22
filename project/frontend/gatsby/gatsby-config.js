const protocol = process.env.PROTOCOL || 'http'
const domain = process.env.DOMAIN || 'localhost'


module.exports = {
    siteMetadata:{
        title: 'LiveCode',
        siteUrl: `${protocol}://${domain}`,
        description: 'LiveCode, frontEnd and backEnd in the browser',
        image: '/favicon.ico'
    },
    plugins:[`gatsby-plugin-sass`,`gatsby-plugin-react-helmet`]
}