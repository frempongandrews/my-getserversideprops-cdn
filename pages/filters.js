import Link from "next/link";

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        's-maxage=20, stale-while-revalidate=180'
    );

    // add a fake timeout of 2.5 seconds
    await new Promise((res) => setTimeout(res, 2500));

    return {
        props: {
            context: context.query,
            'rendered on the server at (UTC)': new Date()
                .toISOString()
                .replace('T', ' ')
                .replace('Z', ''),
        }
    }
}

const Filters = (props) => {
    return (
        <div>
            <h1>Filters page</h1>
            <Link href={"/"}>
                <a> {"<== "}Back to Home</a>
            </Link>

            <div className="description">
                <h3>response header set to Cache-Control, s-maxage=20, stale-while-revalidate=180</h3>
                <ul>
                    <li>If next request made within the next 20 seconds (s-maxage value), the first response, previously cached, will still be considered fresh and will be served</li>
                    <li>If request is made between 20 seconds and 180 seconds(stale-while-revalidate value), the previous cached response will be considered "stale" and will be used to fulfill the API request. At the same time, "in the background," a revalidation request will be made to populate the cache with a fresh value for future use. </li>
                    <li>If request is made after 180 seconds (stale-while-revalidate) then the stale response isn't used at all, and both fulfilling the browser's request and the cache revalidation will depend on getting a response back from the network</li>
                </ul>
            </div>


            <pre>{JSON.stringify(props, null, 4)}</pre>
        </div>
    )
}

export default Filters;