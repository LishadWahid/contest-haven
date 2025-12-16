async function checkServer() {
    const url = 'https://server-qes4pztp3-lishads-projects-69221e56.vercel.app/contests/popular';
    console.log(`\nChecking ${url}...`);
    try {
        const response = await fetch(url);
        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Body:', text.substring(0, 500));

        // Also check root
        const rootResponse = await fetch('https://server-qes4pztp3-lishads-projects-69221e56.vercel.app/');
        console.log('Root Status:', rootResponse.status);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkServer();
