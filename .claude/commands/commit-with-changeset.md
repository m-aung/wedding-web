# Commit with Changeset

Commit staged changes and ensure a changeset exists for the changelog.

## Steps

1. Run `git diff --cached --name-only` to list staged files. If nothing is staged, stop and tell the user.

2. Check for pending changesets: list files in `.changeset/` excluding `README.md` and `config.json`. A pending changeset is any `.md` file that isn't those two.

3. If NO pending changeset exists:
   - Run `git diff --cached --stat` so you can understand what changed.
   - Ask the user two questions in one prompt:
     - **Bump type**: patch (bug fix / copy tweak), minor (new feature or page), or major (breaking redesign)?
     - **Description**: one or two sentences describing what changed, written for a human reading the changelog (not a commit log).
   - Create a changeset file at `.changeset/<slug>.md` where `<slug>` is a short kebab-case phrase derived from the description (e.g. `add-rsvp-email-field.md`). Use this exact format:
     ```
     ---
     "wedding-web": <bump-type>
     ---

     <description>
     ```
   - Stage the new file: `git add .changeset/<slug>.md`

4. If a pending changeset ALREADY exists, read it to use its description for the commit message.

5. Commit with:
   ```
   git commit -m "<type>: <short summary from changeset description>"
   ```
   Where `<type>` is `feat` for minor, `fix` for patch, `chore` for major.
