export function FooterInfo() {
  return (
    <div className="text-center text-sm text-muted-foreground mt-16">
      <p>21% of all payments go to the Noderunners pot</p>
      <p className="mt-2">
        Connect with your Nostr client using:{" "}
        <code className="text-primary">wss://nostr.noderunners.network</code>
      </p>
      <p className="mt-4 text-xs">
        None of the content on this website is Financial Advice.
      </p>
    </div>
  );
}