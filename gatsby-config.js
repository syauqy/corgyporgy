/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Corgy Porgy",
    author: 'Syauqy',
    description:
      "An app to detect a corgi using your camera and Tensorflow JS",
  },
  plugins: [`gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
        name: `Corgy Porgy`,
        short_name: `Corgy Porgy`,
        start_url: `/`,
        icon: `src/images/corgy-porgy.png`, // This path is relative to the root of the site.
    }
},
],
}
