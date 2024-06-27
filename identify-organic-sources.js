(function() {
    // Function to get the value of a query parameter by name
    function getQueryParam(name) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Check if 'utm_source' query parameter is present
    if (!getQueryParam('utm_source')) {
        // Get the referrer URL
        var referrer = document.referrer;
        
        if (referrer) {
            // Create a URL object
            var referrerUrl = new URL(referrer);
            
            // Extract the domain (hostname) from the referrer URL
            var referrerDomain = referrerUrl.hostname;
            
            // Log the referrer domain to the console (or use it as needed)
            console.log(referrerDomain);
            
            // Initialize utm_source and utm_medium variables
            var utm_source = '';
            var utm_medium = '';

            // Arrays of domains for organic and social
            var organicDomains = [
                'google.se', 'google.com', 'bing.se', 'bing.com', 
                'yahoo.se', 'yahoo.com', 'duckduckgo.com', 
                'eniro.se', 'hitta.se', 'search.yahoo.com'
            ];
            var socialDomains = [
                'facebook.com', 'instagram.com', 'twitter.com', 
                'linkedin.com', 'pinterest.com', 'youtube.com', 
                'reddit.com', 'snapchat.com', 'tumblr.com', 
                'tiktok.com'
            ];

            // Helper function to get the main domain excluding the TLD
            function getMainDomain(domain) {
                var parts = domain.split('.');
                return parts.length > 2 ? parts.slice(-2, -1)[0] : parts[0];
            }

            // Helper function to check if a domain ends with any in the list
            function matchesDomainList(domain, domainList) {
                return domainList.some(d => domain.endsWith(d));
            }

            // Check for specific referrer domains and set utm variables accordingly
            if (matchesDomainList(referrerDomain, organicDomains)) {
                utm_source = getMainDomain(referrerDomain);
                utm_medium = 'organic';
            } else if (matchesDomainList(referrerDomain, socialDomains)) {
                utm_source = getMainDomain(referrerDomain);
                utm_medium = 'social';
            }

            // Log the utm variables to the console
            console.log('utm_source:', utm_source);
            console.log('utm_medium:', utm_medium);
            
            // You can use the utm variables as needed in your code
            // For example, assign them to a global object or send them to a server
            // ... your code here ...
        } else {
            console.log("No referrer available");
        }
    } else {
        console.log("utm_source query parameter found, script will not run");
    }
})();
