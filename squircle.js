(function() {

	function Squircle() {
		this.element = document.getElementById('squircle');
		this.percentage = 0;
		this.x = 0;
	};

	Squircle.prototype.draw = function() {
		var inset = 5;
		var size = this.element.width - inset*2;
		var ctx = this.element.getContext('2d');
		var sideLength = size / Math.sqrt(2);
		var offset = (size-sideLength) / 2;
		ctx.clearRect(0, 0, this.element.width, this.element.height);
		ctx.translate(inset, inset);
		ctx.fillStyle = '#ffff00';
		ctx.lineJoin = 'round';
		ctx.lineWidth = 5;
		ctx.beginPath();
		if (this.percentage < 0.01) {
			ctx.moveTo(offset, offset);
			ctx.lineTo(offset+sideLength, offset);
			ctx.lineTo(offset+sideLength, offset+sideLength);
			ctx.lineTo(offset, offset+sideLength);
		} else {
			var radius = (size/2) / this.percentage;
			var y = offset +
				Math.sqrt(radius*radius-Math.pow(sideLength, 2)/4);
			var angleSize = Math.asin(sideLength / (2*radius));
			ctx.arc(size/2, y, radius, 3*Math.PI/2-angleSize,
				3*Math.PI/2+angleSize, false);
			ctx.arc(size-y, size/2, radius, -angleSize, angleSize,
				false);
			ctx.arc(size/2, size-y, radius, Math.PI/2-angleSize,
				Math.PI/2+angleSize, false);
			ctx.arc(y, size/2, radius, Math.PI-angleSize, Math.PI+angleSize,
				false);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.translate(-inset, -inset);
	};

	Squircle.prototype.step = function() {
		this.x += 0.1;
		var number = Math.pow(Math.sin(this.x), 2);
		this.percentage = number;
		this.draw();
	};

	window.addEventListener('load', function() {
		var squircle = new Squircle();
		squircle.draw();
		var stepFunc;
		stepFunc = function() {
			setTimeout(stepFunc, 30);
			squircle.step();
		};
		stepFunc();
	});

})();
