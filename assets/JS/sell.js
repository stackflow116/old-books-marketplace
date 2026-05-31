let isCuratorMode = false;

const toggleBtn = document.getElementById("curator-toggle");
const toggleDot = document.getElementById("curator-toggle-dot");

const titleInput = document.getElementById("input-title");
const authorInput = document.getElementById("input-author");
const priceInput = document.getElementById("price-input");

titleInput.addEventListener("input", updatePreview);
authorInput.addEventListener("input", updatePreview);
priceInput.addEventListener("input", updatePreview);

toggleBtn.addEventListener("click", () => {
  isCuratorMode = !isCuratorMode;

  toggleBtn.classList.toggle("toggle-active");
  toggleDot.classList.toggle("toggle-dot-active");
});

function updatePreview() {
  const title = titleInput.value;
  const author = authorInput.value;
  const price = priceInput.value;

  document.getElementById("preview-title").innerText =
    title || "Book Title";

  document.getElementById("preview-author").innerText =
    author || "Author Name";

  document.getElementById("preview-price").innerText =
    price
      ? `$${parseFloat(price).toLocaleString()}`
      : "$0.00";
}

function validateAndGo(step) {
  const isbnInput = document.getElementById("input-isbn");
  const error = document.getElementById("isbn-error");

  if (!isbnInput.value.trim()) {
    isbnInput.style.borderColor = "#ba1a1a";
    error.classList.remove("hidden");
    isbnInput.focus();
    return;
  }

  isbnInput.style.borderColor = "#d5c3bd";
  error.classList.add("hidden");

  goToStep(step);
}

function goToStep(stepNumber) {
  const steps = [1, 2, 3];

  steps.forEach((step) => {
    const stepEl = document.getElementById(`step-${step}`);
    const indicator = document.getElementById(
      `step-${step}-indicator`
    );

    if (step === stepNumber) {
      stepEl.classList.remove("hidden");

      indicator.classList.add("active");
    } else {
      stepEl.classList.add("hidden");

      indicator.classList.remove("active");
    }
  });

  window.scrollTo({
    top: 150,
    behavior: "smooth"
  });
}

document
  .querySelectorAll(".condition-btn")
  .forEach((button) => {
    button.addEventListener("click", () => {

      document
        .querySelectorAll(".condition-btn")
        .forEach((btn) => {
          btn.classList.remove("active-condition");
        });

      button.classList.add("active-condition");
    });
  });

const coverUpload = document.getElementById("cover-upload");
const spineUpload = document.getElementById("spine-upload");

/*
|--------------------------------------------------------------------------
| Cover Upload
|--------------------------------------------------------------------------
*/

coverUpload.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  const uploadBox = this.parentElement;

  uploadBox.innerHTML = `
    <div class="flex flex-col items-center justify-center">
      <span class="material-symbols-outlined text-4xl text-green-700">
        task_alt
      </span>

      <span class="upload-label">
        Cover Uploaded
      </span>
    </div>
  `;

  uploadBox.style.borderStyle = "solid";
  uploadBox.style.background = "#d7e9bd";

  /*
  |--------------------------------------------------------------------------
  | Live Preview Image
  |--------------------------------------------------------------------------
  */

  const reader = new FileReader();

  reader.onload = function (e) {
    const preview = document.getElementById(
      "preview-image-container"
    );

    preview.innerHTML = `
      <img
        src="${e.target.result}"
        class="w-full h-full object-cover rounded-[10px]"
        alt="Book Cover"
      />
    `;
  };

  reader.readAsDataURL(file);
});

/*
|--------------------------------------------------------------------------
| Spine Upload
|--------------------------------------------------------------------------
*/

spineUpload.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  const uploadBox = this.parentElement;

  uploadBox.innerHTML = `
    <div class="flex flex-col items-center justify-center">
      <span class="material-symbols-outlined text-4xl text-green-700">
        task_alt
      </span>

      <span class="upload-label">
        Spine Uploaded
      </span>
    </div>
  `;

  uploadBox.style.borderStyle = "solid";
  uploadBox.style.background = "#d7e9bd";
});