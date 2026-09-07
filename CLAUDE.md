# CLAUDE.md

A minimal personal writing site built on plain Jekyll. It replaced the al-folio theme;
the guiding constraint is that the whole site should stay small enough to read in one
sitting. Prefer deleting over adding.

## Structure

- `index.md` — the only page. Bio prose (markdown) plus the writing index (Liquid + HTML).
- `_posts/` — the writing. Filenames are `YYYY-MM-DD-lowercase-slug.md`; the slug becomes
  the URL via `permalink: /writing/:title/`.
- `_layouts/default.html` — page shell. `_layouts/post.html` — post chrome.
- `_includes/head.html` — meta, fonts, and MathJax (loaded only on posts).
- `assets/css/main.scss` — the entire stylesheet, one file.
- `assets/js/filter.js` — client-side tag filtering, no dependencies.

## Post front matter

Only `title`, `date`, `tags`, and `description` are used, plus an optional `math: false`
to skip loading MathJax on a post that has none. `layout` comes from `_config.yml`
defaults — do not set it per post. Post bodies contain **no Liquid**; images use plain
`<figure>` HTML so the source stays portable.

Math: kramdown parses it, MathJax renders it. In markdown prose write `\\(` and `\\)` for
inline math (kramdown collapses the double backslash). Inside a raw `<figure>` block,
kramdown does not process escapes, so write single `\(` and `\)` there.

## Tags

Tags are freeform — write whatever you want in a post's `tags:` list. The filter chips on
the home page are generated from `site.tags`, so a new tag needs no configuration. Chip
slugs and the per-entry `data-tags` attribute both come from `slugify`; if you touch that
Liquid, slugify each tag individually rather than the accumulated string.

## Build and verify

```bash
bundle exec jekyll serve   # http://localhost:4000
```

Requires Homebrew Ruby (`/opt/homebrew/opt/ruby/bin` on PATH) — macOS system Ruby is 2.6 and
cannot build this. There is no Docker setup: Docker Desktop's macOS bind mount fails on this
machine with `EDEADLK` on every file read, so it was removed rather than left broken.

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds and publishes `_site` to `gh-pages`,
which GitHub Pages serves. There is no test suite; verify by building and looking at it.

## Scope

Deliberately absent, and should stay absent unless asked: CV page, publications, projects,
comments, analytics, search, pagination, and generated per-tag URLs.
