const barsSegment = document.querySelector(".barsSegment");
const bars = document.querySelectorAll(".bar");
const barSpends = document.querySelectorAll(".barSpending");

let res;
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    //////////////////////
    const amounts = data.map((day) => day.amount);
    let largestAmount = Math.max(...amounts);

    const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const date = new Date().getDay();
    const dayOfWeek = weekDays[date];

    data.forEach((r) => {
      const bar = document.createElement("div");
      bar.classList.add("bar");
      const label = document.createElement("div");
      label.classList.add("barSpending");
      label.innerText = `$${r.amount}`;
      bar.appendChild(label);
      //////bars///
      let percent = r.amount / largestAmount;
      let barheight = percent * 150;
      const barDiv = document.createElement("div");
      barDiv.classList.add("barDiv");
      barDiv.style.height = `${barheight}px`;
      if (r.day === dayOfWeek) {
        barDiv.style.backgroundColor = "hsl(186, 34%, 60%)";
      }
      bar.appendChild(barDiv);
      ////////////
      const p = document.createElement("p");
      p.innerText = r.day;
      bar.appendChild(p);
      bar.addEventListener("mouseover", () => {
        bar.classList.add("selected");
        if (r.day === dayOfWeek) {
          barDiv.style.backgroundColor = "hsl(187, 49%, 80%)";
        }
      });
      bar.addEventListener("mouseout", () => {
        bar.classList.remove("selected");
        if (r.day === dayOfWeek) {
          barDiv.style.backgroundColor = "hsl(186, 34%, 60%)";
        }
      });

      barsSegment.appendChild(bar);
    });
  });
