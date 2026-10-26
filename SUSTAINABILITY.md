# 🌱 Sustainability: what keeps these pages running

<div class="tldr"><i class="ph ph-plant"></i> <strong>TL;DR:</strong> Nothing here costs money. What keeps it alive is a short list of things that quietly expire or drift: one access token, the scheduled jobs, a vendored kit, cached link previews, and a shared wallet-connect project. Each is written down below, with what to do when it needs attention. And today one person holds most of the keys, so there's a plan to change that.</div>

ORG's GitHub home is two public sites built from three repositories, plus Christopher's lab and its
dApp preview, which load the same kit. This page lists what each one needs, so none of it depends on
anyone's memory. It's also the repository's `SUSTAINABILITY.md`, so it reads the same on GitHub.

## The pieces

| Repository | What it is | How it goes live |
| --- | --- | --- |
| [`Octagon-Religious-Research-Group-ORG.github.io`](https://github.com/Octagon-Religious-Research-Group-ORG/Octagon-Religious-Research-Group-ORG.github.io) (public) | The entry portal: `/`, `/donate/`, `/pledge/`, `/map/`, the 404, and the **arrival kit** every page loads | GitHub Pages, straight from `main` |
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

### 🔍 The read-only `LEDGER_TOKEN`

The ledger shows ORG's private work masked (the repository, the day and the kind of change, never
its words). It reads those private repositories with a `LEDGER_TOKEN` secret when one is set, else
with `PUBLIC_REPO_TOKEN`. A fine-grained token with read-only **Contents** access to ORG's private
repositories is the safer choice: the ledger then never needs the write-capable token.

**Set since 2026-10-26:**
- **The token:** the fine-grained `ledger-read-org`, resource owner
  `Octagon-Religious-Research-Group-ORG`.
- **Reach:** all of ORG's repositories, with read-only Contents.
- **⚠️ It expires about 2027-10-27.** ORG's organization settings cap tokens at 366 days, unlike the
  other orgs, whose tokens don't expire. Put a reminder a week before.

*To renew it:* make a new read-only token the same way. Set it as `LEDGER_TOKEN` on `changelog-astro`
(`pbpaste | gh secret set LEDGER_TOKEN -R Octagon-Religious-Research-Group-ORG/changelog-astro`), and
run the workflow once. If no token can read a repository, its masked rows carry over from the
committed snapshot and the page keeps its shape.

### 🗓️ The daily ledger rebuild

The [ledger](https://octagon-religious-research-group-org.github.io/changelog-astro-public/ledger)
lists every public change in plain words. So it stays fresh on days nothing else changes, the
publishing workflow also runs **every day at 10:17 UTC** (`cron: "17 10 * * *"`). The lab rebuilds at
10:41 UTC, which also redraws its map from this AstroLog's `map.json`. Each uses a few minutes of
Actions time a day. The workflow builds on **Node 24** (since 2026-10-26): Astro 7.4 needs Node
22.23.4 or newer, and a bare `22` resolved to 22.23.3.

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
windows, the donate and pledge pages and the map's cards all come from the **arrival kit** (1.4.0):
`arrival.js`, `arrival.css`, `give/give.js` and `pledge/pledge.js`, copied into the portal's
`arrival/` folder, plus ORG's own `org.js` (facts and links) and `org.css` (the three lights and the
octagon shape). The ledger's generator (`astro/src/ledger/ledger.mjs`) is vendored the same way. The canonical copy lives in
[`drasticstatic/my-template`](https://github.com/drasticstatic/my-template) under
`changelog-template/arrival/`. Every org keeps its own copy on purpose, so one org's change can't
break another's.

*What to do:* to upgrade, copy the kit files unchanged from the template, read its porting notes,
and push the portal **before** this AstroLog, the lab and the dApp preview, which load the kit from
the portal. The pledge pins its signature checker (`@noble/curves@1.9.7`, `@noble/hashes@1.8.0`,
from jsDelivr) and the wallet window is pinned too (`@reown/appkit-cdn@1.8.24`); upgrade those in
the kit, not here.

### 🖼️ Cached link previews

Every page has its own share image, built with the site; the portal's is ORG's signature card (the
octagon over marbled ink). Telegram, iMessage, Slack, Discord and LinkedIn keep their own copy of a
link's preview for days or weeks, so after a share image changes, old previews linger. Cards never
carry counts, so a cached one doesn't go stale on its own.

*What to do:* after changing a card, refresh the important links. The steps for each app, and the
list of pages with their own card, are in
[`SOCIAL-PREVIEWS.md`](https://github.com/Octagon-Religious-Research-Group-ORG/.github/blob/main/SOCIAL-PREVIEWS.md)
(for Telegram, send each link to @WebpageBot).

### 👛 Wallet giving and the pledge

[`/donate/`](https://octagon-religious-research-group-org.github.io/donate/) has the kit's wallet
module (`arrival/give/give.js`): one Connect button (Reown AppKit) for browser wallets, phone wallets
by QR code, and email or social sign-in. [`/pledge/`](https://octagon-religious-research-group-org.github.io/pledge/)
uses the same connection to sign a pledge of support: a message, not a transaction, so it's free,
sends nothing and records nothing, and the page shows no counts. No wallet address is published
anywhere: `give.addresses` stays `null` until ORG designates a real treasury address, never a
placeholder, and never one put on a page by hand.

*What to do:* make sure the Reown project below lists
`https://octagon-religious-research-group-org.github.io`; until it does, both pages calmly say wallet
connect isn't switched on for this site yet.

### 🔌 Wallet connect (Reown project)

Every org's wallet features (giving with crypto, and the pledge of support) connect through **one
shared Reown project today: `00b6a1cd528ff580f1fd845ed08b0187`**, made for the O-R-G dApp (it's the
`NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` secret on the dApp's repository) and held in Christopher W's
Reown account. Its allowlist lists all five org origins plus `https://drasticstatic.github.io`. If
that project is deleted, suspended or runs past its free-plan limit, wallet connect stops on every
site at once (each page then says so calmly; nothing breaks).

*What to do:* ORG gets its own project with a **one-line `org.js` change**: create a free project at
dashboard.reown.com under an account ORG controls, add
`https://octagon-religious-research-group-org.github.io` (and any new ORG domain) to its allowlist,
and set `give.reownProjectId` in the portal's `arrival/org.js` to the new ID (the pledge uses it
too). The lab and the dApp preview move to it by their own setting (the dApp's secret). Do it before
ORG publishes a treasury address.

### 🔗 Links that leave GitHub

The navbar, the contact and community windows and the
[map](https://octagon-religious-research-group-org.github.io/changelog-astro-public/map) point at
orgspirituality.org, ORG's chats on Telegram (ORG (Public), Events and Ceremonies, and the two
private members' groups), Tripp's Telegram, ORG's role addresses, and two of ORG's own documents on
iCloud (the ORG overview and the membership form).

*What to do:* if one of those changes, update the portal's `arrival/org.js` (one place for the
navbar and windows), ORG's
[`CONTACTS.md`](https://github.com/Octagon-Religious-Research-Group-ORG/.github/blob/main/CONTACTS.md),
and this AstroLog's map (`src/data/sitemap.ts`).

### 📦 Dependencies

Astro, Satori and sharp are pinned by `package-lock.json`, and the workflow installs exactly those
(`npm ci`). The share-card fonts (Fraunces, Manrope, both OFL) are committed, so a build needs no
font download. Upgrades are deliberate: update, build locally, check the pages and cards, then push.

### 📄 Licenses

ORG's GitHub home is licensed (Christopher's decision, 2026-10-22): code under MIT (`LICENSE`), written
content under CC BY-SA 4.0 (`LICENSE-CONTENT`), and ORG's name, octagon and marks reserved
(`TRADEMARKS.md`), in the organization's `.github`, the portal and this AstroLog (all three files are
on the publish workflow's allowlist, so they reach `changelog-astro-public`). `org-frontend`,
`org-backend` and `ORG-Website` aren't licensed yet.

*What to do:* keep the three files identical across the repositories; a new public repository gets
the same three.

## 🤝 Stewardship and succession

**Today, one person holds most of the keys.** drasticstatic (Christopher W) owns or administers ORG's
GitHub organization, and holds the personal access tokens that publish these pages
(`PUBLIC_REPO_TOKEN`, and a `LEDGER_TOKEN` if one is set), the lab and the dApp preview, and the
Reown account above. That's a single point of failure: if he stepped away, the tokens would expire on
schedule and the AstroLog would quietly stop updating, with nobody else able to renew them. The plan,
so these pages outlive any one person, Christopher included:

1. **At least two owners for the GitHub organization**, from ORG's own people, each with two-factor
   sign-in. Owners can do everything; everyone else gets the narrowest role that works.
2. **Org-owned automation, not personal tokens.** Publishing moves to a GitHub App installed on the
   organization (short-lived tokens, scoped to the repositories it needs), or failing that a
   dedicated bot account whose credentials the owners share. No workflow should depend on one
   person's account.
3. **A token register**: every token, key and secret the sites use, with what it does, which secret
   holds it, who owns it, its scopes and its expiry date, kept where every owner can read it (never
   the values themselves).
4. **A renewal runbook**: for each item in the register, how to renew it, step by step, and a
   reminder a month before each expiry date.
5. **Documented hand-over steps**: how to add an owner, transfer a repository (the lab and the dApp
   preview live in Christopher's own account today), move a custom domain, transfer the Reown project
   (or create ORG's own), and remove someone who's leaving.
6. **Exports and backups**: the repositories (with their issues and history) cloned or exported
   somewhere ORG controls, on a schedule; the same for anything that lives outside GitHub (the
   Netlify and Heroku hosting, the Telegram groups' admin roles, ORG's documents on iCloud).

Progress on each step is on the
[roadmap](https://octagon-religious-research-group-org.github.io/changelog-astro-public/roadmap).

## Who looks after it

Christopher W, with Alfred (Claude Code), until the steps above are done. Questions go through
[Reach out](https://github.com/Octagon-Religious-Research-Group-ORG/.github/blob/main/CONTACTS.md).

*Last reviewed 2026-10-22.*
