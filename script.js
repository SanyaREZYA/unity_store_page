const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const assetsGrid = document.getElementById("assets-grid");
const previewModal = document.getElementById("preview-modal");
const modelViewer = document.getElementById("model-viewer");
const modalCloseButton = document.querySelector(".modal-close");

const createAssetCard = (asset) => {
  const card = document.createElement("article");
  card.className = "asset-card";

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "asset-image";

  const img = document.createElement("img");
  img.src = asset.image;
  img.alt = asset.name;
  img.loading = "lazy";

  imageWrapper.appendChild(img);

  const body = document.createElement("div");
  body.className = "asset-body";

  const title = document.createElement("h3");
  title.textContent = asset.name;

  const description = document.createElement("p");
  description.textContent = asset.description;

  const link = document.createElement("a");
  link.href = asset.link;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "View on Unity Asset Store";

  body.appendChild(title);
  body.appendChild(description);
  const actions = document.createElement("div");
  actions.className = "asset-actions";

  const previewButton = document.createElement("button");
  previewButton.type = "button";
  previewButton.className = "button-secondary";
  previewButton.textContent = "3D Preview";
  previewButton.dataset.model = asset.model || "";
  previewButton.disabled = !asset.model;

  actions.appendChild(previewButton);
  actions.appendChild(link);

  body.appendChild(actions);

  card.appendChild(imageWrapper);
  card.appendChild(body);

  return card;
};

const fallbackAssets = [
  {
    name: "Stat System",
    description: "Flexible stat and modifier system for RPG games.",
    image: "assets/images/stat-system.svg",
    model: "assets/models/stat-system.glb",
    link: "UNITY_ASSET_STORE_LINK",
  },
  {
    name: "Dialogue Toolkit",
    description: "Lightweight branching dialogue system with editor tooling.",
    image: "assets/images/dialogue-system.svg",
    model: "assets/models/dialogue-system.glb",
    link: "UNITY_ASSET_STORE_LINK",
  },
  {
    name: "Cinematic Camera Kit",
    description: "Polished camera rigs for smooth gameplay and cutscenes.",
    image: "assets/images/camera-kit.svg",
    model: "assets/models/camera-kit.glb",
    link: "UNITY_ASSET_STORE_LINK",
  },
];

const renderAssets = (assets) => {
  assetsGrid.innerHTML = "";

  if (!Array.isArray(assets) || assets.length === 0) {
    assetsGrid.innerHTML = "<p class=\"muted\">No assets published yet.</p>";
    return;
  }

  assets.forEach((asset) => {
    const card = createAssetCard(asset);
    assetsGrid.appendChild(card);
  });
};

const loadAssets = async () => {
  try {
    const response = await fetch("data/assets.json");
    if (!response.ok) {
      throw new Error("Failed to load assets.json");
    }

    const assets = await response.json();
    renderAssets(assets);
  } catch (error) {
    // Fallback for local file access or temporary errors.
    renderAssets(fallbackAssets);
    console.error(error);
  }
};

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const openModal = (modelPath) => {
  if (!modelPath || !modelViewer) {
    return;
  }
  modelViewer.setAttribute("src", modelPath);
  previewModal?.classList.add("open");
  previewModal?.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeModal = () => {
  previewModal?.classList.remove("open");
  previewModal?.setAttribute("aria-hidden", "true");
  if (modelViewer) {
    modelViewer.setAttribute("src", "");
  }
  document.body.classList.remove("modal-open");
};

assetsGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.classList.contains("button-secondary")) {
    const modelPath = target.dataset.model;
    openModal(modelPath);
  }
});

previewModal?.addEventListener("click", (event) => {
  if (event.target === previewModal) {
    closeModal();
  }
});

modalCloseButton?.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

loadAssets();
