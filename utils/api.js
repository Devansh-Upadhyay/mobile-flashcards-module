import { AsyncStorage } from 'react-native';


const DECKS_KEY = 'flashcards:decks';

export function getDecks(){
	return AsyncStorage.getItem(DECKS_KEY)
		.then((decks) => {
			return JSON.parse(decks);
		})
}

export function getDeck(key) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[key]
    })
}

export function saveDeckTitle(title){
	let obj = { };
	obj[title] = {
		title: title,
		questions: []
	}
	
	return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(obj))
}

export function addCardToDeck({title, card}){
	return AsyncStorage.getItem(DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      //concat item
      data[title].questions = data[title].questions.concat(card);
      //save on db
      return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(data));
    })
}

export function clearStorage(){
	return AsyncStorage.clear()
}