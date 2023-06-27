document.addEventListener("DOMContentLoaded", function() {
	const asideLogoBtn = document.querySelector("#aside-logo");
	const aside = document.querySelector("aside");
	const main = document.querySelector("main");
	const tbody = document.querySelector("table>tbody");
	const selectAllBtn = document.querySelector("#select-all");


	selectAllBtn.onclick = function() {
		Array.from(tbody.rows).forEach(tr => {
            let selectedSpan = tr.querySelector("span.select-justify");
			if (selectedSpan.classList.contains("select-justify-ensure"))
				selectedSpan.classList.remove("select-justify-ensure");
			else
				selectedSpan.classList.add("select-justify-ensure");
		})
		asideLogoBtn.click();
	};

	let asideMode = true;
	asideLogoBtn.onmouseover = function() {
		if (aside.classList.contains("aside-close")) {
			this.style.transform = "translate(10px,0)";
		}
	};
	asideLogoBtn.onmouseout = function() {
		this.style.transform = "";
	};
	asideLogoBtn.onclick = function() {
		this.onmouseout.call(this, null);
		if (asideMode) {
			asideMode = false;
			asideLogoBtn.className = "aside-logo-close";
			aside.className = "aside-close";
			main.style.filter = "blur(0)";
		} else {
			asideMode = true;
			asideLogoBtn.className = "aside-logo-open";
			aside.className = "aside-open";
			main.style.filter = "blur(10px)";
		}
	};

	let selected = function() {
		let tbody = this.parentNode;
		for (let i = 0; i < tbody.children.length; i++) {
			tbody.children[i].classList.remove("tr-selected");
		}
		this.classList.add("tr-selected");
	};
	tbody.childNodes.forEach(function(tr) {
		tr.onclick = selected;
	});


	
});