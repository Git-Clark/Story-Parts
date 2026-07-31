# Story Parts

Film authorship & other projects. Next.js (App Router), Markdown content, deployed on Vercel.

---

## Run it

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

Requires Node 18.18 or newer. Check with `node --version`.

> **This project has never been built.** It was written without network access,
> so `npm install` and `next build` have not been run against it. Syntax, imports,
> frontmatter keys and CSS class coverage were all verified statically, but the
> first real compile happens on your machine. Expect small fixes, not a rewrite.

> `next/font` downloads Anton, Public Sans and IBM Plex Mono **at build time**.
> If you are behind a restrictive network, that step can fail — see Known issues.

---

## Put it on GitHub and Vercel

```bash
git init
git add .
git commit -m "Story Parts: initial build"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/story-parts.git
git push -u origin main
```

Then at [vercel.com](https://vercel.com) → **Add New Project** → import the repo →
**Deploy**. No configuration; Vercel detects Next.js.

After that, every `git push` rebuilds and republishes automatically. **Saving is
publishing.** That is the single biggest break from Wix and WordPress, and it is
worth being the first thing you teach.

---

## Structure

```
app/
  layout.js              The shell. Rail + fonts + metadata. Wraps every page.
  page.js                Homepage
  blog/page.js           Review Notes index
  blog/[slug]/page.js    ← THE ARTICLE TEMPLATE
  notes/page.js          Other Notes card grid
  notes/[slug]/page.js   Note detail
  projects/page.js       Interactive data projects
  about/page.js          Argument, bio, method, image policy
  not-found.js           404
  rss.xml/route.js       RSS feed
  globals.css            All styling, all breakpoints

components/
  Rail.js                The film margin — written ONCE
  Footer.js
  ReviewTable.js         'use client' — sorting needs a browser

content/
  reviews/*.md           6 film pieces
  notes/*.md             6 non-film pieces
  projects.js            Project records (structured, not prose)

lib/
  posts.js               Reads Markdown, parses frontmatter, renders body
  site.js                Name, URL, social links, craft vocabulary
```

Home is reached by clicking the logo. There is no Home nav item.

---

## Add a post

Create `content/reviews/your-slug.md`. The filename becomes the URL.

```yaml
---
title: "Your headline"
date: "2026-08-01"          # quoted, or YAML shifts the timezone
film: "The Film"
year: 1982
craft: "effects"            # camera cutting design effects sound costume
dek: "One sentence for the homepage and the archive."
claimedRole: "Special effects"
claimedName: "Who you are arguing for"
stats:
  release: "25 June 1982"
  runtime: "109 min"
credits:
  director: "Name"
  cinematographer: "Name"
cast:
  - name: "Actor"
    role: "Character"
links:
  imdb: "https://..."
---

Body text in Markdown.
```

Save, and it appears on the homepage, in the archive, and at its own URL. No code.

### `craft` is the load-bearing field

That one value drives **four things at once**: the archive row tint, the filter
dropdown, the classification stamp on the article page, and the highlighted credit.

This is the clearest demonstration of a content model in the whole project. Show it
to students explicitly — change `craft: "effects"` to `craft: "sound"` in one file
and watch four things move together.

---

## Teaching notes

### The rail exists once

In the static mock, the sidebar was copy-pasted into six HTML files; changing the nav
meant editing six files. Here it is `components/Rail.js`, used once in `layout.js`.
Showing the before and after is the most convincing argument for a framework you will
get in three sessions.

### `'use client'` — one sentence, then move on

`ReviewTable.js` carries a `'use client'` directive. Explain it as:

> **This file needs a browser, because it responds to clicks.**

Everything else on the site is finished HTML before a visitor arrives. Leave hydration,
the server/client boundary, and React Server Components out entirely. They are not
needed to understand this, and they will eat your session.

### One template, many files

`app/blog/[slug]/page.js` renders every review. Six Markdown files today, six hundred
later — still one file. That is the mechanism behind every CMS anyone has ever used,
and here the whole thing is visible in about a hundred lines.

---

## Design system

### Typefaces — "Trade Paper"

| Role | Face | Why |
|---|---|---|
| Display | **Anton** | Condensed grotesque. Trade-press vernacular, not the reverent serif of auteurist criticism |
| Body / nav | **Public Sans** | Reads as a working document |
| Utility | **IBM Plex Mono** | Datelines, edge codes, labels — the site's "documentation layer" |

**Anton has one weight and no italic.** Hierarchy comes from size and spacing only.
Never bold it, never set it in caps at length.

### Colour

Tokens are at the top of `globals.css`.

- **Rail** — `#14100D`, a *warm* near-black. Film stock carries an anti-halation
  backing that reads brown-black, not neutral.
- **Content** — `#E6E1D6` with a low-contrast fibre texture.
- **Craft tints** are warm-shifted toward the paper. White-based pastels go muddy on cream.
- **Colour never carries meaning alone** — every tinted row also names its craft in text.

### The rail

The organising rule: **the rail is the film margin, the content pane is the frame.**
Anything technical — optical track, perforations, edge codes — belongs in the margin.
The image area stays clean. Use this to decide where any new element goes.

| Element | Spec |
|---|---|
| Optical track | Continuous parallel lines, left edge, including the indigo digital-sound band |
| Perforations | 8 × 11px, radius 2, 12px gaps, `right: -5px` so only ~3px shows |
| Edge codes | Rotated 90°, near-invisible by design |
| Grain | `feTurbulence` noise, re-randomised on hover |

**The grain does not slide — it re-randomises.** A panning texture reads as fabric
behind a window. Real grain is a fresh distribution of silver crystals every frame.
`steps(1, end)` jumps to unrelated background offsets, so each frame is a new random
region with no interpolation. Disabled under `prefers-reduced-motion`, and absent on
touch devices, which have no hover.

Perforations are filled with the **paper colour**, so they read as punched through onto
the page. This only holds while the content background stays flat — a full-bleed image
running to the rail's edge would break the illusion.

### The shell

```css
.shell { height: 100dvh; display: grid;
         grid-template-columns: 232px 1fr; overflow: hidden; }
.main  { overflow-y: auto; }
```

Two non-obvious requirements, both already in place:

1. **`100dvh`, never `100vh`.** `vh` includes the mobile URL bar even when hidden,
   pushing the bottom of the layout permanently off-screen.
2. **`tabIndex={0}` on `.main`.** Without it, Page Down and the spacebar do nothing,
   because browsers do not treat an inner scroll container as focusable.

### Mobile (≤ 760px)

The rail **rotates 90° into a top strip** — optical track along the top edge,
perforations along the bottom — rather than collapsing into a hamburger. The film
metaphor survives the rotation the way a strip does.

There is no separate mobile site. Same files, one breakpoint. Drag the window narrow
to see it.

---

## Known issues

**Back-button scroll position is lost.** Browsers restore scroll on the document, not
inside a nested scroller. A reader who scrolls to post 40, clicks in, and hits back
returns to the top. Fixable in JS by storing `scrollTop` before navigation. Unfixed.

**The mobile archive hides the headline.** As specified, `.col-head` is hidden below
760px, leaving rows reading `07.24.26 · EFFECTS · The Thing, 1982` — an inventory
rather than an invitation. To keep headlines and drop dates instead, swap these two
lines in `globals.css`:

```css
.col-head { display: none; }
/* .col-date { display: none; } */
```

**`dangerouslySetInnerHTML` renders the Markdown body.** Safe here because you author
every file yourself. If you ever accept content from anyone else, sanitise it first.

**`next/font` needs network access at build time.** If it fails, either build somewhere
with open network access (Vercel is fine) or download the three font families into
`public/fonts/` and switch to `next/font/local`.

**No ESLint.** Deliberately not installed, so `next build` has one less way to fail in
a classroom. Add it later with `npx next lint` if you want it.

---

## Before this goes public

- [ ] **Logo** — replace the `LOGO` placeholder in `components/Rail.js`. SVG preferred;
      it must hold up small, in one colour, on a grainy near-black field
- [ ] **Hero image** — drop a file in `public/` and swap the placeholder in `app/page.js`.
      Fill in the credit line beneath it
- [ ] **Verify every figure** in `content/reviews/*.md`. Budgets and box office are
      placeholders filled from memory and are flagged as such in each file
- [ ] **Real copy** — the mission statement on the homepage and the argument on the
      About page are stand-ins written to show shape. Those have to be yours
- [ ] **Posters and stills** — add to `public/`, set `poster:` in frontmatter, keep the
      credit line filled
- [ ] Instagram and Substack URLs in `lib/site.js`
- [ ] Real domain in `lib/site.js` → `url` (drives Open Graph and RSS)
- [ ] An Open Graph image at `public/og.png`, 1200 × 630
- [ ] Contrast-check the nav against the grain at final opacity

---

## Deliberately not built

Search, comments, tag taxonomies, newsletter signup (Substack does that), dark mode,
pagination. Each is defensible alone; none earns its complexity at this scale. A single
scrolling archive of everything beats pages of ten — 200 posts is still only about
8,800px, which is a few flicks of a scroll wheel.
