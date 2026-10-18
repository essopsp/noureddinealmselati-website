const CF_BEACON_TOKEN = "b39a02891d4544729691e150ee518485";

export function CloudflareAnalytics() {
  return (
    <script
      type="module"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
    />
  );
}
