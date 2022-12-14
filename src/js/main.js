document.querySelectorAll(".menu a").forEach((a) => {
	a.addEventListener("click", function (event) {
		menu.classList.remove("is-visible");
		overlay.classList.remove("is-visible");
	});
});

const menuBtn = document.querySelector("#menu-mobile");
const menu = document.querySelector("#menu");
const overlay = document.querySelector(".overlay");

console.log(menuBtn);

menuBtn.addEventListener("click", function (event) {
	menu.classList.toggle("is-visible");
	overlay.classList.toggle("is-visible");
});

/*
Affichier la barre de progression au stroll

*/

const scrollProgress = document.getElementById("scroll-progress");
const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
	const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
});

/*
Animation d'éléments apparaissant au scroll
*/

const observer = new IntersectionObserver((entries) => {
	for (const entry of entries) {
		// console.log(entry.target, entry.isVisible, entry.isIntersecting);
		if (entry.isIntersecting) {
			entry.target.classList.add("is-animated");
			entry.target.animate(
				[
					{ transform: "scale(0.97)", opacity: 0.5 },
					{ transform: "scale(1)", opacity: 1 }
				],
				{
					duration: 500,
					iterations: 1,
					fill: "both"
				}
			);
			// observer.unobserve(entry.target); // pour observer une seule fois
		}
	}
});

document.querySelectorAll(".animated-on-scroll").forEach((el) => {
	observer.observe(el);
});

const getCompetencesAPI = async () => {
	const res = await fetch("../../data/competences.json");
	if (res.ok === true) {
		return res.json();
	}
};

getCompetencesAPI()
	.then((res) => {
		const competences = res;
		console.log(competences.length);
		const competencesDiv = document.querySelector(".data-competences");

		for (let i = 0; i < competences.length; i++) {
			console.log(competences);
			const div = document.createElement("div");
			div.classList.add("box");
			div.innerHTML = `
			<div> <img src="${competences[i].icon}" /> </div>
			<h3> ${competences[i].title} </h3>
			<p> ${competences[i].desc} </p>
            `;
			competencesDiv.appendChild(div);
		}
	})
	.catch((e) => {
		throw new Error("Données introuvables via le chemin");
	});

// mode dart
const icon=document.getElementById("icon");
icon.onclick=function(){
	document.body.classList.toggle("dark-theme");
	if(document.body.classList.contains("dark-theme")){
		icon.src="./assets/icons/sun.png";
	}else{
		icon.src="./assets/icons/mod.svg";
	}
}
	
