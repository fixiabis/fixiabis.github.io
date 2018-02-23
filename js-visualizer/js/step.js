var step = 1;
(function nextStep() {
	var nowStep = document.querySelectorAll(`[data-step~=s${step}]`),
		othStep = document.querySelectorAll(`[data-step]:not([data-step~=s${step}])`);
	for (var i = 0; i < othStep.length; i++)
		othStep[i].classList.remove("now");
	if (!nowStep.length) return;
	for (var i = 0; i < nowStep.length; i++)
		nowStep[i].classList.add("now");
	step++;
	setTimeout(nextStep, 1500);
})();