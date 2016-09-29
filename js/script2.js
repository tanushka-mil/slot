var $columns; // колонки
var blinkingInterval; // это для завершальной анимации
var $rouletteContainer = '.roll-item'; // контейнер с будущими колонками
var $images = $('.images .common'); // контейнер с основными картинками
COLUMNS_COUNT = 5; //колличество колонок
FAKE_ROWS_COUNT = 50; // липовые карточки в колонках


window.onload = function() {
	generateFakeRolette(); // запускаем функцию создания липовых карточек
}



function addResults(results, $columns){ // results будет брать из play(), columns- константа
	results.forEach(function(arr, columnIndex){ // columnIndex- индекс колонки; arr- массивы из иыиграшных цыфр
		results.reverse().forEach(function(itemNumber){ // itemNumber - число из перевёрнутого массива из массивов из иыиграшных цыфр
			var item = $images[itemNumber - 1]; // объявила переменную
			$($columns[columnIndex]).prepend($(item).clone()); // cloneNode() выдаёт ошибку, заменила его на .clone()
		})
	})
}

function generateRandom(COLUMNS_COUNT, FAKE_ROWS_COUNT){ // тут переименовала переменные ккоторые принимает функкция т.к. написанно в констатах
	var results = []; // обьявила переменную
	for(columnIndex = 0; columnIndex < COLUMNS_COUNT; columnIndex++){ //columnIndex- индекс колонки
		results[columnIndex] = [];
		for(rowIndex = 0; rowIndex < FAKE_ROWS_COUNT; rowIndex++){ // rowIndex - индекс елемента в коллонке
			results[columnIndex][rowIndex] = Math.floor(Math.random() * (10 - 1 + 1)) + 1; // генерацию случайных чисел чть поменяла
		}
	}
	return results;
	// console.log(results); но ничего не выводит
}

function createContainers($rouletteContainer, COLUMNS_COUNT){ // тут переименовала переменные ккоторые принимает функкция т.к. написанно в констатах
	for(i = 0; i < COLUMNS_COUNT; i++){
		$($rouletteContainer).append('<div class="lines" />');
	}

	return $($rouletteContainer).find('.lines');
	//эта функция отработала
}

function generateFakeRolette(){
	$columns = createContainers($rouletteContainer, COLUMNS_COUNT); // тут всё яно
	var fakeResults = generateRandom(COLUMNS_COUNT, FAKE_ROWS_COUNT); // обьявила переменную
	addResults(fakeResults, $columns); // тут всё яно
}
