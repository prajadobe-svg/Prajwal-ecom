export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-base uppercase tracking-widest2">
              Nomad <span className="text-brass">Audio</span>
            </p>
            <p className="mt-3 max-w-[22ch] text-sm text-muted">
              Passive gear for people who like turning knobs, not apps.
            </p>
          </div>

          <div>
            <p className="eyebrow">Catalog</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>Headphones</li>
              <li>Speakers</li>
              <li>Turntables</li>
              <li>Accessories</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Company</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>Warranty</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Signal</p>
            <p className="mt-4 text-sm text-muted">
              One email a month when something new ships. No tracking pixels.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Nomad Audio. Demo storefront.</span>
          <span className="font-mono">NA / built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
