# Release

Cut a new semver release using Changesets.

## Steps

1. Check `git status` — abort if there are uncommitted changes and tell the user to commit or stash them first.

2. Check for pending changesets: list `.changeset/*.md` excluding `README.md` and `config.json`. If none exist, warn the user that the release will not update `CHANGELOG.md` (no changesets to consume), and ask whether to proceed anyway.

3. Run `npm run version` — this consumes all pending changeset files, bumps `package.json`, and writes the new section in `CHANGELOG.md`.

4. Show the user:
   - The new version from `package.json`
   - The relevant new section at the top of `CHANGELOG.md`

5. Stage and commit the version bump:
   ```
   git add package.json CHANGELOG.md
   git commit -m "chore: release v<new-version>"
   ```

6. Tag the release: `git tag v<new-version>`

7. Ask the user: "Push this release to origin? (`git push --follow-tags`)" and only push if they confirm.
