//游戏数据
var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
$(function() {
	prepareForMobile();
	newgame();
})

//移动端准备函数
function prepareForMobile() {
	if( documentWidth > 500) {
		gridContainerWidth = 500;
		cellSideLength = 100;
		cellSpace = 20;

		$('.footer').show();
	}
	else {
		$('#grid-container').css({
			'width': gridContainerWidth - 2 * cellSpace,
			'height': gridContainerWidth - 2 * cellSpace,
			'padding': cellSpace,
			'border-radius': 0.02 * gridContainerWidth
		})

		$('.grid-cell').css({
			'width': cellSideLength,
			'height': cellSideLength,
			'border-radius': 0.02 * cellSideLength
		})

		$('.footer').hide();
	}
}

//开始新游戏
function newgame() {
	//初始化棋盘格
	init();
	//使随机的两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

//游戏初始化
function init() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $('#grid-cell-' + i + '-' + j);
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
		}
	}

	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}

	updateBoardView();

	score = 0;
	updateScore( score );
}

//根据number-cell里边的值来判断是否显示内容
function updateBoardView() {

	$('.number-cell').remove();

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#grid-container').append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
			var theNumberCell = $('#number-cell-'+i+'-'+j);

			if( board[i][j] == 0 ) {
				theNumberCell.css({
					'width': '0px',
					'height': '0px',
					'top': getPosTop( i, j ) + cellSideLength / 2,
					'left': getPosLeft( i, j ) + cellSideLength / 2
				})
			}
			else {
				theNumberCell.css({
					'width': cellSideLength,
					'height': cellSideLength,
					'top': getPosTop( i, j ),
					'left': getPosLeft( i, j ),
					'background-color': getNumberBackgroundColor( board[i][j] ),
					'color': getNumberColor( board[i][j] )
				});
				theNumberCell.text( getNumberText( board[i][j] ) );
			}

			hasConflicted[i][j] = false;
		}
	}

	$('.number-cell').css('line-height', cellSideLength + 'px');
	$('.number-cell').css('font-size', 0.22 * cellSideLength + 'px');
}

//随机产生一个数字
function generateOneNumber() {
	if ( nospace( board ) ) {
		return false;
	}

	//随机一个位置
	var randx = parseInt( Math.floor(Math.random() * 4) ),
		randy = parseInt( Math.floor(Math.random() * 4) );

	var times = 0;

	while ( times < 50 ) {
		if ( board[randx][randy] == 0 ) {
			break;
		}

		randx = parseInt( Math.floor(Math.random() * 4) );
		randy = parseInt( Math.floor(Math.random() * 4) );

		times ++;
	}

	if( times == 50 ) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if ( board[i][j] == 0 ) {
					randx = i;
					randy = j;
				}
			}
		}
	}

	//随机一个数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;

	//在随机位置生成随机数
	board[randx][randy] = randNumber;
	showNumberWithAnimation( randx, randy, randNumber );

	return true;
}

var keys = true;
$(document).keydown( function( event ) {
	//判断按键的类型
	switch( event.keyCode ) {
		case 37: //left
			if ( keys && moveLeft() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
			break;
		case 38: //up
			if ( keys && moveUp() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
			event.preventDefault();
			break;
		case 39: //right
			if ( keys && moveRight() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
			break;
		case 40: //down
			if ( keys && moveDown() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
			event.preventDefault();
			break;
		default: //default
			break;
	}	
	keys = false;
})

$(document).keyup( function( event ) {
	keys = true;
})

document.addEventListener('touchstart', function(event) {
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
})

document.addEventListener('touchmove', function(event) {
	event.preventDefault();
})

document.addEventListener('touchend', function(event) {
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY; 

	var deltax = endx - startx;
	var deltay = endy - starty;

	if( Math.abs(deltax) < 0.3*documentWidth && Math.abs(deltay) < 0.3*documentWidth ) return;

	//x轴方向进行
	if( Math.abs(deltax) >= Math.abs(deltay) ) {
		if( deltax > 0 ) {
			//right
			if ( moveRight() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
		}
		else {
			//left
			if ( moveLeft() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
		}
	}
	//y轴方向进行
	else {
		if( deltay > 0 ) {
			//down
			if ( moveDown() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
		}
		else {
			//up
			if ( moveUp() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
		}
	}
})

//左移的效果
function  moveLeft() {
	if ( !canMoveLeft( board ) ) {
		return false;
	}

	//moveLeft
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if( board[i][j] != 0 ) {
				for (var k = 0; k < j; k++) {
					if ( board[i][k] == 0 && noBlockHorizontal( i, k, j, board ) ) {
						//move
						showMoveAnimation( i, j, i, k );
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if ( board[i][j] == board[i][k] && noBlockHorizontal( i, k, j, board ) && !hasConflicted[i][k] ) {
						//move
						showMoveAnimation( i, j, i, k );

						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;

						//addScore
						score += board[i][k];
						updateScore( score );

						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()",200);
	return true;
}

//上移的效果
function moveUp() {
	if ( !canMoveUp( board ) ) {
		return false;
	}

	//moveUp
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if ( board[i][j] != 0 ) {
				for (var k = 0; k < i; k++) {
					if ( board[k][j] == 0 && noBlockVertical( j, k, i, board ) ) {
						//move
						showMoveAnimation( i, j, k, j );
						board[k][j] = board[i][j];
						board[i][j] = 0;

						continue;
					}
					else if ( board[i][j] == board[k][j] && noBlockVertical( j, k, i, board ) && !hasConflicted[k][j] ) {
						//move
						showMoveAnimation( i, j, k, j );

						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;

						//addScore
						score += board[k][j];
						updateScore( score );

						hasConflicted[k][j] = true;
						continue
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()",200);
	return true;
}

//右移的效果
function moveRight() {
	if ( !canMoveRight( board ) ) {
		return false;
	}

	//moveRight
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if ( board[i][j] != 0 ) {
				for (var k = 3; k > j; k--) {
					if ( board[i][k] == 0 && noBlockHorizontal( i, j, k, board ) ) {
						//move
						showMoveAnimation( i, j, i, k );
						board[i][k] = board[i][j];
						board[i][j] = 0;

						continue;
					}
					else if ( board[i][k] == board[i][j] && noBlockHorizontal( i, j, k, board ) && !hasConflicted[i][k] ) {
						//move
						showMoveAnimation( i, j, i, k );

						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;

						//addScore
						score += board[i][k];
						updateScore( score );

						hasConflicted[i][k] = true;
						continue
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()",200);
	return true;
}

//下移的效果
function moveDown() {
	if ( !canMoveDown( board ) ) {
		return false;
	}

	//moveDown
	for (var i = 2; i >= 0; i--) {
		for (var j = 0; j < 4; j++) {
			if ( board[i][j] != 0 ) {
				for (var k = 3; k > i; k--) {
					if ( board[k][j] == 0 && noBlockVertical( j, i, k, board ) ) {
						//move
						showMoveAnimation( i, j, k, j );
						board[k][j] = board[i][j];
						board[i][j] = 0;

						continue;
					}
					else if ( board[i][j] == board[k][j] && noBlockVertical( j, i, k, board ) && !hasConflicted[k][j] ) {
						//move
						showMoveAnimation( i, j, k, j );

						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;

						//addScore
						score += board[k][j];
						updateScore( score );

						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()",220);
	return true;
}

//判断游戏是否结束
function isGameOver() {
	if( nospace( board ) && nomove( board ) ) {
		gameover();
	}
}

//弹出游戏结束框
function gameover() {
	alert('游戏结束！');
}