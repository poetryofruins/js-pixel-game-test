function in_circle(x, y, a, b, r) {
	var r2, xa, yb;
	
	r2 = r * r;
	xa = (x - a) * (x - a);
	yb = (y - b) * (y - b);
	
	if(xa + yb <= r2) {
		return true;
	} else {
		return false;
	}
	
}

jQuery(document).ready(function($) {
	
	var player = {
		x: 0, 
		y: 30,
		draw: function() {
			ry = 95 - this.y;
			$('table tr:eq(' + ry + ') td:eq(' + this.x + ')').css('backgroundColor', '#a00000');
			$('table tr:eq(' + (ry + 1) + ') td:eq(' + this.x + ')').css('backgroundColor', '#a00000');
		},
		remove: function() {
			ry = 95 - this.y;
			$('table tr:eq(' + ry + ') td:eq(' + this.x + ')').css('backgroundColor', 'lightblue');
			$('table tr:eq(' + (ry + 1) + ') td:eq(' + this.x + ')').css('backgroundColor', 'lightblue');
		},
		move_to: function(distance) {
			this.remove();
			
			this.x += distance;
			
			if(this.x > 255) {
				this.x = 255;
			}
			
			if(this.x < 0) {
				this.x = 0;
			}
			
			var earth = $('table tr:eq(0) td:eq(0)').css('backgroundColor');
			
			for(i = 0; i < 96; i++) {
				var ri = 95 - i;
				var color = $('table tr:eq(' + ri + ') td:eq(' + this.x + ')').css('backgroundColor');
				if(color != earth) {
					this.y = i + 2;
				} else {
					break;
				}
			}
			
			this.draw();
		},
		explode: function() {
			draw_circle(this.x, this.y, 10, '#a00000');
			draw_circle(this.x, this.y, 15, 'lightblue');
		}
	};

	function draw_circle(a, b, r, color) {
		var x, y;
		var ry;
		for(x = 0; x < 256; x++) {
			for(y = 0; y < 96; y++) {
				if(in_circle(x, y, a, b, r)) {
					ry = 95 - y;
					$('table tr:eq(' + ry + ') td:eq(' + x + ')').css('backgroundColor', color);
				}
			}
		}
	}
	
	function clear_blackboard() {
		$('table td').css('backgroundColor', '#ffffff');
	}
	
	function freckle() {
		for(x = 0; x < 256; x++) {
			for(y = 0; y < 96; y++) {
				if(Math.random() > 0.5) {
					ry = 95 - y;
					$('table tr:eq(' + ry + ') td:eq(' + x + ')').css('backgroundColor', '#ffffff');
				}
			}
		}
	}
	
	function in_graph(x, y) {
		if(y == x + Math.floor(Math.sin(x) * 3) + 10 + Math.floor(Math.tan(x) * 3)) {
			return true;
		}
		
		return false;
	}
	
	function draw_hill() {
		var min = 10;
		var max = 200;
		var start = Math.floor(Math.random() * (max - min) + min);
		var length = Math.floor(Math.random() * 100);
		var previous = 20;
		
		console.log('drawing hill', start, length);
		
		for(x = start; x < (start + length); x++) {
			current = (previous + (Math.floor(Math.sin(x) * 5)) + (Math.floor(Math.random() * 25)) - (Math.floor(Math.random() * 25))) / 4 + 25;
			for(y = 15; y < 96; y++) {
				if(y <= current) {
					ry = 96 - y;
					$('table tr:eq(' + ry + ') td:eq(' + x + ')').css('backgroundColor', '#835C3B');
				}
			}
			previous = current;
		}
	}
	
	$('#redraw').click(function() {
		var x, y, previous = 20, current;
		
		$('table tr td').css('backgroundColor', 'lightblue');
		$('table tr:gt(81) td').css('backgroundColor', '#835C3B');
		
		draw_circle(230, 70, 10, 'yellow');
		
		for(x = 0; x < 256; x++) {
			current = (previous + (Math.floor(Math.sin(x) * 5)) + (Math.floor(Math.random() * 15)) - (Math.floor(Math.random() * 15))) / 4 + 20;
			for(y = 15; y < 96; y++) {
				if(y <= current) {
					ry = 96 - y;
					$('table tr:eq(' + ry + ') td:eq(' + x + ')').css('backgroundColor', '#835C3B');
				}
			}
			previous = current;
		}
		
		draw_hill();
		
		player.move_to(0);
		player.draw();
		
	});
	
	$('body').keydown(function(e) {
		if(e.keyCode == 37) {
			player.move_to(-1);
		}
		
		if(e.keyCode == 39) {
			player.move_to(1);
		}
	});
	
	$('body').keydown(function(e) {
		if(e.keyCode == 32) {
			player.explode();
		}
	});
	
	$('#redraw').trigger('click');
	
	$('#clear').click(function() {
		clear_blackboard();
	});
	
	$('#freckle').click(function() {
		freckle();
	});
	
	$('#draw_freckled').click(function() {
		var a = $('#center_x').val(), b = $('#center_y').val(), r = $('#radius').val(), rim = $('#rim').val();
		
		draw_circle(a, b, r);
		freckle();
		draw_circle(a, b, r - rim);
	});
});
