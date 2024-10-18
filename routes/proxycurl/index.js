'use strict'

function fakeProxycurlRequest(companyUrl_LI) {
    // have a timeout of 60 seconds, as per the proxycurl documentation


    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                status: 200,
                message: 'This is a fake response from proxycurl',
                data: {
                    company: 'Fake Company',
                    website: 'https://fakecompany.com',
                    linkedin: 'https://www.linkedin.com/company/fakecompany'
                }
            })
        }, 1500) // similate a 1.5 second delay
    })
}



// This can only get information on one company at a time.
module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        // Get linked in link from query string
        // Call with "http://localhost:3000/proxycurl?company=https://www.linkedin.com/company/airbnb"
        console.log(request.query)
        const companyUrl_LI = request.query.company

        // Check if LinkedIn url is valid
        if (!companyUrl_LI) {
            return { status: 400, message: 'Please provide a valid LinkedIn company url' }
        } else if (!companyUrl_LI.includes('https://www.linkedin.com/company/')) {
            return { status: 400, message: 'LinkedIn url is incorrectly formatted' }
        }

        // Get information from proxycurl
        const response = await fakeProxycurlRequest(companyUrl_LI)

        // Check that response is valid
        if (response.status !== 200) {
            return { status: response.status, message: response.message }
        }

        // Log the response
        console.log('Proxy curl returned this for ' + companyUrl_LI + ': ')
        console.log(response)

        // Return the response
        return response
      })
}