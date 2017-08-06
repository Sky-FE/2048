var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellSideLength = 0.18 * documentWidth;
var cellSpace = 0.04 * documentWidth;

//获得相应棋盘格距离主体上边缘的距离
function getPosTop(i, j) {
	return cellSpace + (cellSideLength + cellSpace) * i;
}

//获得相应棋盘格距离主体左边缘的距离
function getPosLeft(i, j) {
	return cellSpace + (cellSideLength + cellSpace) * j;
}

//定义相应数字对应的背景颜色
function getNumberBackgroundColor( num ) {
	switch( num ) {
		case 2: return '#eee4da'; break;
		case 4: return '#ede0c8'; break;
		case 8: return '#f2b179'; break;
		case 16: return '#f59563'; break;
		case 32: return '#f67c5f'; break;
		case 64: return '#f65e3b'; break;
		case 128: return '#edcf72'; break;
		case 256: return '#edcc61'; break;
		case 512: return '#9c0'; break;
		case 1024: return '#33b5e5'; break;
		case 2048: return '#09c'; break;
		case 4096: return '#a6c'; break;
		case 8192: return '#93c'; break;
	}

	return '#000';
}

//定义相应数字对应的文字内容
function getNumberText( num ) {
	switch ( num ) {
		case 2: return "小白"; break;
		case 4: return "实习生"; break;
		case 8: return "程序猿"; break;
		case 16: return "攻城狮"; break;
		case 32: return "项目经理"; break;
		case 64: return "架构师"; break;
		case 128: return "技术经理"; break;
		case 256: return "高级经理"; break;
		case 512: return "技术总监"; break;
		case 1024: return "副总裁"; break;
		case 2048: return "CTO"; break;
		case 4096: return "总裁"; break;
		case 8192: return "无敌"; break;
	}
}

//定义相应数字对应的文字颜色
function getNumberColor( num ) {
	if ( num <= 4 ) {
		return '#776e65';
	}
	return '#fff';
}

//判断棋盘格是否没有空间
function nospace( board ) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if ( board[i][j] ==0 ) {
				return false;
			}
		}
	}

	return true;
}

//判断是否可以左移
function canMoveLeft( board ) {
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if( board[i][j] != 0 ) {
				if ( board[i][j-1] == 0 || board[i][j] == board[i][j-1] ) {
					return true;
				}
			}
		}
	}

	return false;
}

//判断是否可以上移
function canMoveUp( board ) {
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if ( board[i][j] != 0 ) {
				if( board[i-1][j] == 0 || board[i][j] == board[i-1][j] ) {
					return true;
				}
			}
		}
	}

	return false;
}

//判断是否可以右移
function canMoveRight( board ) {
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if ( board[i][j] != 0 ) {
				if( board[i][j+1] == 0 || board[i][j] == board[i][j+1] ) {
					return true;
				}
			}
		}
	}

	return false;
}

//判断是否可以下移
function canMoveDown( board ) {
	for (var i = 2; i >= 0; i--) {
		for (var j = 0; j < 4; j++) {
			if ( board[i][j] != 0 ) {
				if( board[i+1][j] == 0 || board[i][j] == board[i+1][j] ) {
					return true;
				}
			}
		}
	}

	return false;
}

//判断序列为col1，col2两列之间有无横向块元素遮挡
function noBlockHorizontal( row, col1, col2 ,board ) {
	for (var i = col1+1; i < col2; i++) {
		if( board[row][i] != 0 ) {
			return false;
		}
	}

	return true;
}

//判断序列为row1，row2两行之间有无竖向块元素遮挡
function noBlockVertical( col, row1, row2, board ) {
	for (var i = row1 + 1; i < row2; i++) {
		if ( board[i][col] != 0 ) {
			return false;
		}
	}

	return true;
}

//判断是否不能移动
function nomove( board ) {
	if ( canMoveLeft( board ) || canMoveUp( board ) || canMoveRight( board ) || canMoveDown( board ) ) 
	{
		return false;
	}

	return true;
}