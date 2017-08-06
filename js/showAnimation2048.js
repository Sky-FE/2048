//显示棋盘格内容的动画
function showNumberWithAnimation( i, j, randNumber ) {
	var numberCell = $('#number-cell-'+i+'-'+j);
	
	numberCell.css({
		'background-color': getNumberBackgroundColor( randNumber ),
		'color': getNumberColor( randNumber )
	});
	numberCell.text( getNumberText( randNumber ) );

	numberCell.animate({
		width: cellSideLength,
		height: cellSideLength,
		top: getPosTop( i, j ),
		left: getPosLeft( i, j )
	},60)
}

//显示移动过程的动画
function showMoveAnimation( fromX, fromY, toX, toY ) {
	var numberCell = $('#number-cell-'+fromX+'-'+fromY);

	numberCell.animate({
		top: getPosTop( toX, toY ),
		left: getPosLeft( toX, toY )
	},200)
}

//显示分数
function updateScore( score ) {
	$('#score').text( score );
}