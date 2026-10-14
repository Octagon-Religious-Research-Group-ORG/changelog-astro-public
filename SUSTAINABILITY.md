# 🌱 Sustainability: what keeps these pages running

<div class="tldr"><i class="ph ph-plant"></i> <strong>TL;DR:</strong> Nothing here costs money. What keeps it alive is a short list of things that quietly expire or drift: one access token, the scheduled jobs, a vendored kit, cached link previews, and (later) a wallet allowlist. Each is written down below, with what to do when it needs attention.</div>

ORG's GitHub home is two public sites built from three repositories, plus Christopher's lab and its
dApp preview, which load the same kit. This page lists what each one needs, so none of it depends on
anyone's memory. It's also the repository's `SUSTAINABILITY.md`, so it reads the same on GitHub.

## The pieces

| Repository | What it is | How it goes live |
| --- | --- | --- |
| [`Octagon-Religious-Research-Group-ORG.github.io`](https://github.com/Octagon-Religious-Research-Group-ORG/Octagon-Religious-Research-Group-ORG.github.io) (public) | The entry portal: `/`, `/donate/`, `/map/`, the 404, and the **arrival kit** every page loads | GitHub Pages, straight from `main` |
| `changelog-astro` (private) | The source of this AstroLog: entries, write-ups, the Astro site | A workflow builds it and publishes **only the finished pages** |
| [`changelog-astro-public`](https://github.com/Octagon-Religious-Research-Group-ORG/changelog-astro-public) (public) | The built AstroLog you're reading | GitHub Pages, from what the workflow pushes |
| [`drasticstatic/O-R-G-astro-public`](https://drasticstatic.github.io/O-R-G-astro-public/) and [`O-R-G-dapp-public-preview`](https://drasticstatic.github.io/O-R-G-dapp-public-preview/) | Christopher's lab and its dApp preview, outside the organization | Their own workflows, from private sources; they load ORG's kit from the portal |

## What can quietly stop, and what to do

### 🔑 The publishing token (`PUBLIC_REPO_TOKEN`)

The AstroLog is published by a workflow in the private source repository, which pushes the finished
pages into `changelog-astro-public` with a **classic personal access token** stored as the secret
`PUBLIC_REPO_TOKEN` (set on 2026-10-12). Classic tokens expire. When it does, **the site stops
updating without any visible sign on the site itself**: new entries, the daily ledger and every fix
simply stop arriving, and the pages keep showing the last good build. The same token lets the ledger
read the private repositories it shows masked, unless a separate `LEDGER_TOKEN` is set (below).

*What to do:* look up the token's expiry date (GitHub → Settings → Developer settings → Personal
access tokens) and note it here. Before it passes, make a new classic token with the `repo` and
`workflow` scopes, paste it into `changelog-astro` → Settings → Secrets → Actions →
`PUBLIC_REPO_TOKEN`, then run the workflow by hand once (Actions → Sync Public AstroLog → Run
workflow) and check that the ledger's newest day is today.

### 🔍 An optional read-only `LEDGER_TOKEN`

The ledger shows ORG's private work masked (the repository, the day and the kind of change, never
its words). It reads those private repositories with a `LEDGER_TOKEN` secret when one is set, else
with `PUBLIC_REPO_TOKEN`. A fine-grained token with read-only **Contents** access to ORG's private
repositories is the safer choice: the ledger then never needs the write-capable token.

*What to do:* nothing is required. To separate the two, create the read-only token, add it as
`LEDGER_TOKEN` on `changelog-astro`, and run the workflow once. If neither can read a repository,
its masked rows carry over from the committed snapshot and the page keeps its shape.

### 🗓️ The daily ledger rebuild

The [ledger](https://octagon-religious-research-group-org.github.io/changelog-astro-public/ledger)
lists every public change in plain words. So it stays fresh on days nothing else changes, the
publishing workflow also runs **every day at 10:17 UTC** (`cron: "17 10 * * *"`). The lab rebuilds at
10:41 UTC, which also redraws its map from this AstroLog's `map.json`. Each uses a few minutes of
Actions time a day.

*What to do:* if the ledger's newest day looks old, open the workflow's run history. A failed
scheduled run usually means the token above, or GitHub's API having a bad moment (the build then
falls back to a committed snapshot and still publishes).

### 🪞 The hourly README mirror

The portal's `README.md` is a copy of the organization profile (`.github` → `profile/README.md`),
refreshed **every hour** by a workflow in the portal repository. GitHub switches off scheduled
workflows in a public repository after 60 days without activity.

*What to do:* edit the profile, never the portal's README. If the copy stops following, re-enable
the "Mirror org profile README" workflow in the portal's Actions tab.

### 🧰 The arrival kit is vendored

The navbar, the light and motion controls, search, the welcome guide, the contact and community
windows, the donate page and the map's cards all come from the **arrival kit**: `arrival.js` and
`arrival.css`, copied into the portal's `arrival/` folder, plus ORG's own `org.js` (facts and links)
and `org.css` (the three lights and the octagon shape). The canonical copy lives in
[`drasticstatic/my-template`](https://github.com/drasticstatic/my-template) under
`changelog-template/arrival/`. Every org keeps its own copy on purpose, so one org's change can't
break another's.

*What to do:* to upgrade, copy the two kit files unchanged from the template, read its porting
notes, and push the portal **before** this AstroLog, the lab and the dApp preview, which load the
kit from the portal.

### 🖼️ Cached link previews

Every page has its own share image, built with the site; the portal's is ORG's signature card (the
octagon over marbled ink). Telegram, iMessage, Slack, Discord and LinkedIn keep their own copy of a
link's preview for days or weeks, so after a share image changes, old previews linger. Cards never
carry counts, so a cached one doesn't go stale on its own.

*What to do:* after changing a card, refresh the important links. The steps for each app, and the
list of pages with their own card, are in
[`SOCIAL-PREVIEWS.md`](https://github.com/Octagon-Religious-Research-Group-ORG/.github/blob/main/SOCIAL-PREVIEWS.md)
(for Telegram, send each link to @WebpageBot).

### 👛 Wallet giving, later

The "give with crypto" slot on [`/donate/`](https://octagon-religious-research-group-org.github.io/donate/)
is empty on purpose. The dApp preview's wallet connection runs on a **Reown project** (its ID is the
`NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` secret on the dApp's repository), and Reown only loads on the
domains its project allows: today that's `https://drasticstatic.github.io`.

*What to do:* when crypto giving comes to ORG's own pages, add
`https://octagon-religious-research-group-org.github.io` (and any new ORG domain) to the Reown
project's allowlist, with a real project ID (never a demo one). Never put a wallet address on a page
by hand.

### 🔗 Links that leave GitHub

The navbar, the contact and community windows and the
[map](https://octagon-religious-research-group-org.github.io/changelog-astro-public/map) point at
orgspirituality.org, ORG's Telegram group, Tripp's Telegram, and ORG's role addresses.

*What to do:* if one of those changes, update the portal's `arrival/org.js` (one place for the
navbar and windows), ORG's
[`CONTACTS.md`](https://github.com/Octagon-Religious-Research-Group-ORG/.github/blob/main/CONTACTS.md),
and this AstroLog's map (`src/data/sitemap.ts`).

### 📦 Dependencies

Astro, Satori and sharp are pinned by `package-lock.json`, and the workflow installs exactly those
(`npm ci`). The share-card fonts (Fraunces, Manrope, both OFL) are committed, so a build needs no
font download. Upgrades are deliberate: update, build locally, check the pages and cards, then push.

## Who looks after it

Christopher W, with Alfred (Claude Code). Questions go through
[Reach out](https://github.com/Octagon-Religious-Research-Group-ORG/.github/blob/main/CONTACTS.md).

*Last reviewed 2026-10-13.*
