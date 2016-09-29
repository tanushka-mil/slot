var $columns;
ver blinkingInterval;
$rouletteContainer = '.main-container'
$images = $('.images-container .image')
COLUMNS_COUNT = 5
FAKE_ROWS_COUNT = 50

// --------------
var LINES_CARDS_POSITIONS = {
	5: [[0,2], [1,1], [2,0], [3,1], [4,2]]
}


function addResults(results, $columns){
	results.forEach(function(arr, columnIndex){
		arr.reverse().forEach(function(itemNumber){
			item = $images[itemNumber - 1]; 
			$($columns[columnIndex]).prepend(item.cloneNode());
		})
	})
}

function generateRandom(columnCount, rowsCount){
	results = [] //+var
	for(columnIndex = 0; columnIndex < columnCount; columnIndex++){ 
		results[columnIndex] = [];
		for(rowIndex = 0; rowIndex < rowsCount; rowIndex++){ 
			results[columnIndex][rowIndex] = Math.floor(Math.random()*10); 
		}
	}
	return results;
}

function createContainers($mainContainer, columnCount){ 
	for(i = 0; i < columnCount; i++){  
		$mainContainer.append('<div class="column" />'); 
	}

	return $mainContainer.find('.column'); 

function generateFakeRolette(){
	$columns = createContainers($rouletteContainer, COLUMNS_COUNT);
	fakeResults = generateRandom(COLUMNS_COUNT, FAKE_ROWS_COUNT); 
	addResults(fakeResults, $columns);
}

generateFakeRolette();





function play(){
	clearInterval(blinkingInterval);
	animationStartTime = Dane.now()
	// add animation class to each $columns

	$.ajax({
		success: function(res){
			//... results
			addResults(results, $columns);
			fakeResults = generateRandom(COLUMNS_COUNT, 1);
			addResults(fakeResults, $columns);


			$newColumns = createContainers(rouletteContainer, COLUMNS_COUNT);
			$newColumns.hide()

			fakeResults = generateRandom(COLUMNS_COUNT, 1);
			addResults(fakeResults, $newColumns);
			addResults(results, $newColumns);
			fakeResults = generateRandom(COLUMNS_COUNT, FAKE_ROWS_COUNT - results[0].length - 1);
			addResults(fakeResults, $newColumns);

			$newColumns.show();
			$columns.remove();
			$columns = $newColumns;


			timeFromColumnsAnimationStart = Dane.now() - animationStartTime;
			setTimout(function(){
				// blinking lines animation
			}, COLUMNS_ANIMATION_TIME - timeFromColumnsAnimationStart);
		}
	})
}








function winLines (data) {
	res = []
	for(key in data) {
		if (data[key]) {
			res.push(key);
		}
	}
}


imagesInColumns = [
	$column[0].find('.image'),
	$column[1].find('.image'),
	$column[2].find('.image'),
	$column[3].find('.image'),
	$column[4].find('.image')
]

function imageAtPosition (columnIndex, rowIndex) {
	return imagesInColumns[columnIndex][rowIndex]
}

currentLineIndex = 0

blinkingInterval = setInterval(function () {
	lineKey = winLines[currentLineIndex];
	cardsPositions = linesCardsPositions[lineKey];

	// do blinking with cards

	currentLineIndex++
	if (currentLineIndex == winLines.length) {
		currentLineIndex = 0
	}

}, LINE_BLINKING_TIME)