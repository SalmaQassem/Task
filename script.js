const silhouettes = document.querySelectorAll(".silhouette");
const pictures = document.querySelectorAll(".picture");
const buttons = document.querySelectorAll(".modal button");
const delay = 250;
let counter = 0;
window.addEventListener("load", () => {
  const element = document.createElement("div");
  element.className = "score";
  const child = document.createElement("span");
  child.textContent = `${counter}/${silhouettes.length}`;
  element.appendChild(child);
  document.querySelector(".screen").prepend(element);
});
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.add("hide");
    document.querySelector(".overlay").classList.remove("show");
    setTimeout(() => {
      btn.parentElement.classList.add("remove");
      btn.parentElement.classList.remove("show");
      if (btn.classList.contains("continue")) {
        document.querySelector("#audio").play();
        document.querySelector(".game").classList.add("show");
        showItems(silhouettes);
        setTimeout(() => {
          showItems(pictures);
        }, silhouettes.length * delay);
      }
    }, 600);
  });
});
const showItems = (list) => {
  let i = 0;
  const intervalID = setInterval(() => {
    if (i >= list.length) {
      clearInterval(intervalID);
    } else {
      list[i].style.visibility = "visible";
      list[i].classList.add("open");
      i += 1;
    }
  }, delay);
};
pictures.forEach((picture) => {
  picture.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("id", event.target.dataset.id);
  });
});
silhouettes.forEach((silhouette) => {
  silhouette.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  silhouette.addEventListener("drop", (event) => {
    event.preventDefault();
    const pictureId = event.dataTransfer.getData("id");
    const silhouetteId = event.target.dataset.id;
    if (pictureId === silhouetteId) {
      document.querySelector(`audio[id="${pictureId}"]`).play();
      counter += 1;
      const scoreElement = document.querySelector(".score > span");
      scoreElement.textContent = `${counter}/${silhouettes.length}`;
      document
        .querySelector(":root")
        .style.setProperty(
          "--width",
          `${(100 / silhouettes.length) * counter}%`
        );
      const pictureElement = document.querySelector(
        `.picture[data-id="${pictureId}"]`
      );
      pictureElement.style.opacity = "0.5";
      pictureElement.draggable = false;
      pictureElement.style.cursor = "default";
      event.target.style.opacity = "1";
      if (counter === silhouettes.length) {
        const success = document.querySelector(".modal.success");
        const text = document.querySelector(".modal.success > p");
        text.textContent = `correct answers:${counter}/${silhouettes.length}`;
        success.classList.add("show");
        document.querySelector(".overlay").classList.add("show");
        setTimeout(() => {
          document.querySelector(`audio[id="7"]`).play();
        }, 1000);
      }
    }
  });
});
