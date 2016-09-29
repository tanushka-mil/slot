var $columns;
var blinkingInterval;
var $rouletteContainer = '.roll-item';
var $rouletteChangeContainer = '.new-roll';
var $images = $(".images .common .item");
COLUMNS_COUNT = 5;
FAKE_ROWS_COUNT = 49;
var MAX_COUNT_IMG = 10; //???????????????????????????????//


$(function(){
	generateFakeRolette();
});

function addResults(results, $columns){
	results.forEach(function(arr, columnIndex){
		arr.reverse().forEach(function(itemNumber){
			var item = $images[itemNumber -1];
			$($columns[columnIndex]).prepend($(item).clone());
		})
	})
}

function generateRandom(COLUMNS_COUNT, FAKE_ROWS_COUNT, MAX_COUNT_IMG){ 
	var results = [];
	for(columnIndex = 0; columnIndex < COLUMNS_COUNT; columnIndex++){
		results[columnIndex] = [];
		for(rowIndex = 0; rowIndex < FAKE_ROWS_COUNT; rowIndex++){
			results[columnIndex][rowIndex] = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
		}
	}
	return results;
}

function createContainers($rouletteContainer, COLUMNS_COUNT){
	for(i = 0; i < COLUMNS_COUNT; i++){
		$($rouletteContainer).append('<div class="lines" />');
	}

	return $($rouletteContainer).find('.lines');
}

function generateFakeRolette(){
	$columns = createContainers($rouletteContainer, COLUMNS_COUNT);
	var fakeResults = generateRandom(COLUMNS_COUNT, FAKE_ROWS_COUNT);
	addResults(fakeResults, $columns);
}

$(document).on('click', '#play', function(e){
	play();
});

$(document).on('click', '#one', function(e){
	oneActiveLine();
});

$(document).on('click', '#three', function(e){
	threeActiveLine();
});

$(document).on('click', '#five', function(e){
	fiveActiveLine();
});

$(document).on('click', '#seven', function(e){
	sevenActiveLine();
});

$(document).on('click', '#nine', function(e){
	nineActiveLine();
});


function play(){
	clearInterval(blinkingInterval);
	// var animationStartTime = Dane.now();
	// add animation class to each $columns
	$(".line").hide();
	$(".roll").addClass("invisible");
	$( ".lines" ).each(function( index, element ) {
		setTimeout(function() {
			$( element ).addClass("animation-in");  
		}, 200*index);
	});

	$.ajax({
		type: "GET",
		url:  'js/data.json', 
		dataType: 'json',

		success: function(res){
			//... results

			// console.log(res); 
			var commonArray = res.ServerReply.split('|');
			results =[commonArray.splice(0, 3), commonArray.splice(0, 3), commonArray.splice(0, 3), commonArray.splice(0, 3), commonArray];

			addResults(results, $columns);
			var fakeResults = generateRandom(COLUMNS_COUNT, 1); 
			addResults(fakeResults, $columns);


			var $newColumns = createContainers($rouletteChangeContainer, COLUMNS_COUNT);
			$newColumns.hide(); 

			fakeResults = generateRandom(COLUMNS_COUNT, 1);
			addResults(fakeResults, $newColumns);
			addResults(results, $newColumns);
			fakeResults = generateRandom(COLUMNS_COUNT, FAKE_ROWS_COUNT - results[0].length - 1);
			addResults(fakeResults, $newColumns);

			setTimeout(function() {
				$(".roll-item").hide(); 
				$(".new-roll").show();
				// $newColumns.show();
				// $columns.remove(); 
				$columns = $newColumns;
				// $($rouletteContainer).hide();
				$(".roll-item").addClass("new-roll").removeClass("roll-item"); 
				$(".new-roll").addClass("roll-item").removeClass("new-roll");
			}, 5600);



			// var timeFromColumnsAnimationStart = Dane.now() - animationStartTime;
			// setTimout(function(){
			// 	// blinking lines animation
			// }, COLUMNS_ANIMATION_TIME - timeFromColumnsAnimationStart);
		}
	})
}



$(document).on('click', '#one', function(e){
	oneActiveLine();
});

$(document).on('click', '#three', function(e){
	threeActiveLine();
});

$(document).on('click', '#five', function(e){
	fiveActiveLine();
});

$(document).on('click', '#seven', function(e){
	sevenActiveLine();
});

$(document).on('click', '#nine', function(e){
	nineActiveLine();
});




// assignment img
// function imgWinVar(){
// 	$( ".winer" ).each(function() { 
// 		var arr = $(this).attr("data-number"); 
// 		if ($(this).attr("data-number") == 1) {
// 			$(this).children().attr('src', 'css/img/image/A/win.jpg');
// 		} else if ($(this).attr("data-number") == 2) {
// 			$(this).children().attr('src', 'css/img/image/book/win.jpg');
// 		} else if ($(this).attr("data-number") == 3) {
// 			$(this).children().attr('src', 'css/img/image/cowboy/win.jpg');
// 		} else if ($(this).attr("data-number") == 4) {
// 			$(this).children().attr('src', 'css/img/image/fly/win.jpg');
// 		} else if ($(this).attr("data-number") == 5) {
// 			$(this).children().attr('src', 'css/img/image/J/win.jpg');
// 		} else if ($(this).attr("data-number") == 6) {
// 			$(this).children().attr('src', 'css/img/image/K/win.jpg');
// 		} else if ($(this).attr("data-number") == 7) {
// 			$(this).children().attr('src', 'css/img/image/Q/win.jpg');
// 		} else if ($(this).attr("data-number") == 8) {
// 			$(this).children().attr('src', 'css/img/image/sphinx/win.jpg');
// 		} else if ($(this).attr("data-number") == 9) {
// 			$(this).children().attr('src', 'css/img/image/zhuk/win.jpg');
// 		} else if ($(this).attr("data-number") == 10) {
// 			$(this).children().attr('src', 'css/img/image/10/win.jpg');
// 		} 
// 	}); 
// }


// var currentDataArray = null;
// var winSymbolsArray = null;
// function sendAjax() {
// 	if (document.getElementById("plaing")) {
// 		jQuery.ajax({ 
// 			type: "GET",
// 			url:  'js/data.json', 
// 			dataType: 'json',
// 			success: function(data){
// 				winSymbolsArray = data.WinSymbols;
// 				var winLine = data.Lines;
// 				winSymbols(commonArray,winSymbolsArray, winLine); 
// 				replayCards(fifthArrayLine, fourthArrayLine, thirdArrayLine, secondArrayLine, firstArrayLine);
// 			}
// 		});
// 	} else if (currentDataArray) {
// 		// winSymbols(commonArray);
// 		replayCards(fifthArrayLine, fourthArrayLine, thirdArrayLine, secondArrayLine, firstArrayLine);
// 	} 
// }


// WinSymbols
// function winSymbols(commonArray,winSymbolsArray, winLine){
// 	var winObjects = $('.winer-lines .winer');
// 	$(winObjects).each(function( index, element ) {
// 		$( element ).attr("data-number", commonArray[index]); 
// 		imgWinVar();
// 	});
// 	var firstWinLine = $('.winer-lines .winer.first-win-line');
// 	var secondWinLine = $('.winer-lines .winer.second-win-line');
// 	var thirdWinLine = $('.winer-lines .winer.third-win-line');
// 	var fourthWinLine = $('.winer-lines .winer.fourth-win-line');
// 	var fifthWinLine = $('.winer-lines .winer.fifth-win-line');
// 	var sixthWinLine = $('.winer-lines .winer.sixth-win-line');
// 	var seventhWinLine = $('.winer-lines .winer.seventh-win-line');
// 	var eighthWinLine = $('.winer-lines .winer.eighth-win-line');
// 	var ninthWinLine = $('.winer-lines .winer.ninth-win-line');

// 	var first = {"key": winLine["1"]};
// 	var second = {"key": winLine["2"]};
// 	var third = {"key": winLine["3"]};
// 	var fourth = {"key": winLine["4"]};
// 	var fifth = {"key": winLine["5"]};
// 	var sixth = {"key": winLine["6"]};
// 	var seventh = {"key": winLine["7"]};
// 	var eighth = {"key": winLine["8"]};
// 	var ninth = {"key": winLine["9"]};

// 	var firstArr = winSymbolsArray[0];
// 	var secondArr = winSymbolsArray[1];
// 	var thirdArr = winSymbolsArray[2];
// 	var fourthArr = winSymbolsArray[3];
// 	var fifthArr = winSymbolsArray[4];
// 	var sixthArr = winSymbolsArray[5];
// 	var seventhArr = winSymbolsArray[6];
// 	var eighthArr = winSymbolsArray[7];
// 	var ninthArr = winSymbolsArray[8];

// 	setTimeout(function() {
// 		if (first.key > 0) {
// 			firstWinLine[0].lastChild.previousSibling.innerHTML = first.key;
// 			firstWinLine[0].lastChild.previousSibling.style.color = "#5699f1";
// 			firstWinLine[0].lastChild.previousSibling.style.borderColor = "#5699f1";
// 			for (var i = 0; i < 5; i++) {
// 				if (firstArr[i] !== 0) {
// 					firstWinLine[i].style.opacity = "1";
// 					firstWinLine[i].style.outline = "5px solid #5699f1";
// 				}
// 			};
// 			$(".winers .line.first").show().addClass("visible");
// 		}
// 		if (second.key > 0) {
// 			secondWinLine[0].lastChild.previousSibling.innerHTML = second.key;
// 			for (var i = 0; i < 5; i++) {
// 				if (secondArr[i] !== 0) {
// 					secondWinLine[i].style.opacity = "1";
// 					secondWinLine[i].style.outline = "5px solid #b10b0a";
// 				}
// 			};
// 			secondWinLine[0].lastChild.previousSibling.style.color = "#b10b0a";
// 			secondWinLine[0].lastChild.previousSibling.style.borderColor = "#b10b0a";
// 			$(".winers .line.second").show().addClass("visible");
// 		}
// 		if (third.key > 0) {
// 			thirdWinLine[0].lastChild.previousSibling.innerHTML = third.key;
// 			thirdWinLine[0].lastChild.previousSibling.style.color = "#2f8f1e";
// 			thirdWinLine[0].lastChild.previousSibling.style.borderColor = "#2f8f1e";
// 			for (var i = 0; i < 5; i++) {
// 				if (thirdArr[i] !== 0) {
// 					thirdWinLine[i].style.opacity = "1";
// 					thirdWinLine[i].style.outline = "5px solid #2f8f1e";
// 				}
// 			};
// 			$(".winers .line.third").show().addClass("visible");
// 		} 
// 		if (fourth.key > 0) {
// 			fourthWinLine[0].lastChild.previousSibling.innerHTML = fourth.key;
// 			fourthWinLine[0].lastChild.previousSibling.style.color = "#ead72c";
// 			fourthWinLine[0].lastChild.previousSibling.style.borderColor = "#ead72c";
// 			for (var i = 0; i < 5; i++) {
// 				if (fourthArr[i] !== 0) {
// 					fourthWinLine[i].style.opacity = "1";
// 					fourthWinLine[i].style.outline = "5px solid #ead72c";
// 				}
// 			};
// 			$(".winers .line.fourth").show().addClass("visible");
// 		} 
// 		if (fifth.key > 0) {
// 			fifthWinLine[0].lastChild.previousSibling.innerHTML = fifth.key;
// 			fifthWinLine[0].lastChild.previousSibling.style.color = "#d95faf";
// 			fifthWinLine[0].lastChild.previousSibling.style.borderColor = "#d95faf";
// 			for (var i = 0; i < 5; i++) {
// 				if (fifthArr[i] !== 0) {
// 					fifthWinLine[i].style.opacity = "1";
// 					fifthWinLine[i].style.outline = "5px solid #d95faf";
// 				}
// 			};
// 			$(".winers .line.fifth").show().addClass("visible");
// 		} 
// 		if (sixth.key > 0) {
// 			sixthWinLine[0].lastChild.previousSibling.innerHTML = sixth.key;
// 			sixthWinLine[0].lastChild.previousSibling.style.color = "#c4f448";
// 			sixthWinLine[0].lastChild.previousSibling.style.borderColor = "#c4f448";
// 			for (var i = 0; i < 5; i++) {
// 				if (sixthArr[i] !== 0) {
// 					sixthWinLine[i].style.opacity = "1";
// 					sixthWinLine[i].style.outline = "5px solid #c4f448";
// 				}
// 			};
// 			$(".winers .line.sixth").show().addClass("visible");
// 		} 
// 		if (seventh.key > 0) {
// 			seventhWinLine[0].lastChild.previousSibling.innerHTML = seventh.key;
// 			seventhWinLine[0].lastChild.previousSibling.style.color = "#eda691";
// 			seventhWinLine[0].lastChild.previousSibling.style.borderColor = "#eda691";
// 			for (var i = 0; i < 5; i++) {
// 				if (seventhArr[i] !== 0) {
// 					seventhWinLine[i].style.opacity = "1";
// 					seventhWinLine[i].style.outline = "5px solid #eda691";
// 				}
// 			};
// 			$(".winers .line.seventh").show().addClass("visible");
// 		} 
// 		if (eighth.key > 0) {
// 			eighthWinLine[0].lastChild.previousSibling.innerHTML = eighth.key;
// 			eighthWinLine[0].lastChild.previousSibling.style.color = "#7fa0ad";
// 			eighthWinLine[0].lastChild.previousSibling.style.borderColor = "#7fa0ad";
// 			for (var i = 0; i < 5; i++) {
// 				if (eighthArr[i] !== 0) {
// 					eighthWinLine[i].style.opacity = "1";
// 					eighthWinLine[i].style.outline = "5px solid #7fa0ad";
// 				}
// 			};
// 			$(".winers .line.eighth").show().addClass("visible");
// 		} 
// 		if (ninth.key > 0) {
// 			ninthWinLine[0].lastChild.previousSibling.innerHTML = ninth.key;
// 			ninthWinLine[0].lastChild.previousSibling.style.color = "#f6af54";
// 			ninthWinLine[0].lastChild.previousSibling.style.borderColor = "#f6af54";
// 			for (var i = 0; i < 5; i++) {
// 				if (ninthArr[i] !== 0) {
// 					ninthWinLine[i].style.opacity = "1";
// 					ninthWinLine[i].style.outline = "5px solid #f6af54";
// 				}
// 			};
// 			$(".winers .line.ninth").show().addClass("visible");
// 		}
// 		if ($(".winers .line").hasClass("visible")) {
// 			$(".winers").css("background","rgba(0,0,0,.65)"); 
// 		}
// 	}, 5000); 
// } 


// function replayCards(fifthArrayLine, fourthArrayLine, thirdArrayLine, secondArrayLine, firstArrayLine){
// 	var firstLine = $('.lines.first .unit');
// 	var secondLine = $('.lines.next-to-first .unit');
// 	var thirdLine = $('.lines.middle .unit');
// 	var fourthLine = $('.lines.prev-to-last .unit');
// 	var fifthLine = $('.lines.last .unit');
// 	$(fifthLine).each(function( index, element ) {
// 		if (document.getElementById("replay")) { 
// 			if (index == 1){
// 				$( element ).attr("data-number", fifthArrayLine[2]);
// 				console.log('replay'); 
// 				console.log(fifthArrayLine[2]);
// 				console.log(element);
// 			} else if (index == 2){
// 				$( element ).attr("data-number", fifthArrayLine[1]);
// 			} else if (index == 3){
// 				$( element ).attr("data-number", fifthArrayLine[0]);
// 			}
// 			imgVar(); 
// 		} else if (document.getElementById("in-play")) {
// 			if (index == 49){
// 				$( element ).attr("data-number", fifthArrayLine[2]); 
// 				console.log('play');
// 				console.log(fifthArrayLine[2]);
// 				console.log(element);
// 			} else if (index == 50){
// 				$( element ).attr("data-number", fifthArrayLine[1]);
// 			} else if (index == 51){
// 				$( element ).attr("data-number", fifthArrayLine[0]);
// 			}
// 			imgVar();
// 		} else if (document.getElementById("no-game")) {
// 			if (index == 1){
// 				$( element ).attr("data-number", fifthArrayLine[2]); 
// 				console.log(element);
// 				console.log(fifthArrayLine[2]); 
// 				console.log('no-game');  
// 			} else if (index == 2){
// 				$( element ).attr("data-number", fifthArrayLine[1]);
// 			} else if (index == 3){
// 				$( element ).attr("data-number", fifthArrayLine[0]);
// 			}  else {
// 				$( element ).attr("data-number", getRandomInt());
// 			}
// 			imgVar();
// 		} else {
// 			console.log('loading');
// 			$( element ).attr("data-number", getRandomInt());
// 		}
// 	});
// 	$(fourthLine).each(function( index, element ) {
// 		if (document.getElementById("replay")) { 
// 			if (index == 1){
// 				$( element ).attr("data-number", fourthArrayLine[2]); 
// 			} else if (index == 2){
// 				$( element ).attr("data-number", fourthArrayLine[1]);
// 			} else if (index == 3){
// 				$( element ).attr("data-number", fourthArrayLine[0]);
// 			}  
// 			imgVar(); 
// 		} else if (document.getElementById("in-play")) {
// 			if (index == 49){
// 				$( element ).attr("data-number", fourthArrayLine[2]); 
// 			} else if (index == 50){
// 				$( element ).attr("data-number", fourthArrayLine[1]);
// 			} else if (index == 51){
// 				$( element ).attr("data-number", fourthArrayLine[0]);
// 			}
// 			imgVar();
// 		}else if (document.getElementById("no-game")) {
// 			if (index == 1){
// 				$( element ).attr("data-number", fourthArrayLine[2]); 
// 			} else if (index == 2){
// 				$( element ).attr("data-number", fourthArrayLine[1]);
// 			} else if (index == 3){
// 				$( element ).attr("data-number", fourthArrayLine[0]);
// 			}  else {
// 				$( element ).attr("data-number", getRandomInt());
// 			}
// 			imgVar();
// 		} else {
// 			$( element ).attr("data-number", getRandomInt());
// 		}
// 	});
// 	$(thirdLine).each(function( index, element ) {
// 		if (document.getElementById("replay")) { 
// 			if (index == 1){
// 				$( element ).attr("data-number", thirdArrayLine[2]); 
// 			} else if (index == 2){
// 				$( element ).attr("data-number", thirdArrayLine[1]);
// 			} else if (index == 3){
// 				$( element ).attr("data-number", thirdArrayLine[0]);
// 			}  
// 			imgVar(); 
// 		} else if (document.getElementById("in-play")) {
// 			if (index == 49){
// 				$( element ).attr("data-number", thirdArrayLine[2]); 
// 			} else if (index == 50){
// 				$( element ).attr("data-number", thirdArrayLine[1]);
// 			} else if (index == 51){
// 				$( element ).attr("data-number", thirdArrayLine[0]);
// 			}
// 			imgVar();
// 		}else if (document.getElementById("no-game")) {
// 			if (index == 1){
// 				$( element ).attr("data-number", thirdArrayLine[2]); 
// 			} else if (index == 2){
// 				$( element ).attr("data-number", thirdArrayLine[1]);
// 			} else if (index == 3){
// 				$( element ).attr("data-number", thirdArrayLine[0]);
// 			}  else {
// 				$( element ).attr("data-number", getRandomInt());
// 			}
// 			imgVar();
// 		} else {
// 			$( element ).attr("data-number", getRandomInt());
// 		}
// 	});
// 	$(secondLine).each(function( index, element ) {
// 		if (document.getElementById("replay")) { 
// 			if (index == 1){
// 				$( element ).attr("data-number", secondArrayLine[2]); 
// 			} else if (index == 2){
// 				$( element ).attr("data-number", secondArrayLine[1]);
// 			} else if (index == 3){
// 				$( element ).attr("data-number", secondArrayLine[0]);
// 			}  
// 			imgVar(); 
// 		} else if (document.getElementById("in-play")) {
// 			if (index == 49){
// 				$( element ).attr("data-number", secondArrayLine[2]); 
// 			} else if (index == 50){
// 				$( element ).attr("data-number", secondArrayLine[1]);
// 			} else if (index == 51){
// 				$( element ).attr("data-number", secondArrayLine[0]);
// 			}
// 			imgVar();
// 		}else if (document.getElementById("no-game")) {
// 			if (index == 1){
// 				$( element ).attr("data-number", secondArrayLine[2]); 
// 			} else if (index == 2){
// 				$( element ).attr("data-number", secondArrayLine[1]);
// 			} else if (index == 3){
// 				$( element ).attr("data-number", secondArrayLine[0]);
// 			}  else {
// 				$( element ).attr("data-number", getRandomInt());
// 			}
// 			imgVar();
// 		} else {
// 			$( element ).attr("data-number", getRandomInt());
// 		}
// 	});
// 	$(firstLine).each(function( index, element ) {
// 		if (document.getElementById("replay")) { 
// 			if (index == 1){
// 				$( element ).attr("data-number", firstArrayLine[2]); 
// 			} else if (index == 2){
// 				$( element ).attr("data-number", firstArrayLine[1]);
// 			} else if (index == 3){
// 				$( element ).attr("data-number", firstArrayLine[0]);
// 			}  
// 			imgVar(); 
// 		} else if (document.getElementById("in-play")) {
// 			if (index == 49){
// 				$( element ).attr("data-number", firstArrayLine[2]); 
// 			} else if (index == 50){
// 				$( element ).attr("data-number", firstArrayLine[1]);
// 			} else if (index == 51){
// 				$( element ).attr("data-number", firstArrayLine[0]);
// 			}
// 			imgVar();
// 		} else if (document.getElementById("no-game")) {
// 			if (index == 1){
// 				$( element ).attr("data-number", firstArrayLine[2]); 
// 			} else if (index == 2){
// 				$( element ).attr("data-number", firstArrayLine[1]);
// 			} else if (index == 3){
// 				$( element ).attr("data-number", firstArrayLine[0]);
// 			}  else {
// 				$( element ).attr("data-number", getRandomInt());
// 			}
// 			imgVar();
// 		} else {
// 			$( element ).attr("data-number", getRandomInt());
// 		}
// 	});
// } 


function oneActiveLine(){
	$(".line").hide();
	$(".line.first").show();
}
function threeActiveLine(){
	$(".line").hide();
	$(".line.second").show();
	$(".line.first").show();
	$(".line.third").show();
}
function fiveActiveLine(){
	$(".line").show();
	$(".line.sixth").hide();
	$(".line.seventh").hide();
	$(".line.eighth").hide();
	$(".line.ninth").hide();
}
function sevenActiveLine(){
	$(".line").show();
	$(".line.eighth").hide();
	$(".line.ninth").hide();
}
function nineActiveLine(){
	$(".line").show();
}