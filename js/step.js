var step = 1, 
	logger = document.querySelector(".log"),
	temp = document.querySelector(".temp");
(function nextStep() {
	var nowStep = document.querySelectorAll(`[data-step~=s${step}]`),
		othStep = document.querySelectorAll(`[data-step]:not([data-step~=s${step}])`);
	for (var i = 0; i < othStep.length; i++)
		othStep[i].classList.remove("now");
	if (!nowStep.length) return;
	for (var i = 0; i < nowStep.length; i++)
		nowStep[i].classList.add("now");
	temp.innerHTML = "";
	if (action && action[step]) action[step]();
	step++;
	setTimeout(nextStep, 1500);
})();