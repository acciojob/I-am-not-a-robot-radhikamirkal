//your code here
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
const imagesDiv = document.getElementById("images");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const result = document.getElementById("para");

let selectedImages = [];

// 🔀 Shuffle helper
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// 🖼️ Create randomized images
function loadImages() {
  imagesDiv.innerHTML = "";
  selectedImages = [];
  result.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";

  message.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";

  // pick one random image to duplicate
  const duplicate =
    imageClasses[Math.floor(Math.random() * imageClasses.length)];

  const finalImages = shuffle([...imageClasses, duplicate]);

  finalImages.forEach((cls) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.type = cls;

    img.addEventListener("click", () => handleImageClick(img));
    imagesDiv.appendChild(img);
  });
}

// 🖱️ Image click logic
function handleImageClick(img) {
  if (selectedImages.includes(img)) return;
  if (selectedImages.length === 2) return;

  img.classList.add("selected");
  selectedImages.push(img);

  resetBtn.style.display = "inline-block";

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// 🔁 Reset button
resetBtn.addEventListener("click", () => {
  loadImages();
});

// ✔️ Verify button
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  const [img1, img2] = selectedImages;

  if (img1.dataset.type === img2.dataset.type) {
    result.textContent = "You are a human. Congratulations!";
  } else {
    result.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// 🚀 Initial load
loadImages();
