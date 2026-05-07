# Release

Cut a new semver release for this project using `standard-version`.

## Steps

1. Check `git status` — abort if there are uncommitted changes and tell the user to commit or stash them first.
2. Show recent commits since the last tag (`git log $(git describe --tags --abbrev=0)..HEAD --oneline`) so the user can preview what will be included.
3. Determine the bump type:
   - If the user passed an argument (`$ARGUMENTS`), use it as the release type: `patch`, `minor`, or `major`.
   - Otherwise, infer from the commit log: `feat:` → minor, `fix:` → patch, `BREAKING CHANGE` or `!:` → major. Default to patch if unclear.
4. Run the appropriate release script:
   - `npm run release:patch` / `npm run release:minor` / `npm run release:major`
5. Show the new version number and the relevant section of `CHANGELOG.md` that was generated.
6. Ask the user: "Push this release to origin? (git push --follow-tags)" and only push if they confirm.
