(function() {

	function Squircle(element, thickness, fill, stroke) {
		this.element = element;
		this.thickness = thickness || 5;
		this.fill = fill || '#ffff00';
		this.stroke = stroke || 'black';
		this.percentage = 0;
		this.x = 0;
	};

	Squircle.prototype.draw = function() {
		var inset = this.thickness;
		var size = this.element.width - inset*2;
		var ctx = this.element.getContext('2d');
		var sideLength = size / Math.sqrt(2);
		var offset = (size-sideLength) / 2;
		ctx.clearRect(0, 0, this.element.width, this.element.height);
		ctx.translate(inset, inset);
		ctx.fillStyle = this.fill;
		ctx.strokeStyle = this.stroke;
		ctx.lineWidth = this.thickness;
		ctx.lineJoin = 'round';
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
		var squircles = [
			new Squircle(document.getElementById('face')),
			new Squircle(document.getElementById('left-eye'), 20, '#00ff00'),
			new Squircle(document.getElementById('right-eye'), 20, '#00ff00'),
			new Squircle(document.getElementById('nose'), 3, '#ff0000'),
			new Squircle(document.getElementById('mouth'), 30, 'black', '#e32153')
		];
		var stepFunc;
		stepFunc = function() {
			setTimeout(stepFunc, 30);
			for (var i = 0; i < squircles.length; ++i) {
				squircles[i].step();
			}
		};
		stepFunc();
	});

})();
