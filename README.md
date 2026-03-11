# SanyaREZYA Unity Asset Store Publisher Website

A minimal, dark-themed static website for the Unity Asset Store publisher page. It includes a hero section, about section, dynamically loaded asset cards, social links, and a contact footer.

## Edit asset listings

Update `data/assets.json` to add or remove assets. Each entry includes:

- `name`: Asset name shown on the card.
- `description`: Short summary.
- `image`: Path to an image (SVG/PNG/JPG) under `assets/images`.
- `model`: Path to a `.glb` model under `assets/models`.
- `link`: Your Unity Asset Store URL.

Example:

```json
{
  "name": "Stat System",
  "description": "Flexible stat and modifier system for RPG games.",
  "image": "assets/images/stat-system.svg",
  "model": "assets/models/stat-system.glb",
  "link": "https://assetstore.unity.com/"
}
```

## Adding 3D previews

1. Export your model as `.glb`.
2. Place the file in `assets/models/`.
3. Add the path in `data/assets.json` using the `model` field.

Example:

```json
"model": "assets/models/sword.glb"
```

## Deploy to GitHub Pages

1. Create a new repository on GitHub.
2. Upload the project files (`index.html`, `style.css`, `script.js`, `assets/`, `data/`).
3. In the repository settings, open **Pages** and set the source to the `main` branch (root).
4. Save. After a short build, the site will be available at the GitHub Pages URL shown in the settings.
