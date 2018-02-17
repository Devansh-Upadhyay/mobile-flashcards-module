import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDeck, getDecks } from '../utils/api';
import { white, yellow, gray, lightGray } from '../utils/colors';
import  AddCard from './AddCard';
import StartQuiz from './StartQuiz';
 
class DeckDetail extends Component{
	state = {
		title: '',
		questions: []
	}

	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params
		return {
			title: title
		}
	}

	refreshCards = () => {
		const { title } = this.state

		//if add a card on deck, refresh on the main page
		//this.props.navigation.state.params.refresh();
		this.refreshDecks();

		//refresh cards from current Deck
		getDeck(title)
			.then((deck) => {
				this.setState({title: deck.title, questions: deck.questions})
			});
	}

	refreshDecks = () => {
		const { dispatch } = this.props
	    getDecks()
	      .then((decks) => dispatch(receiveDecks(decks)));
	}

	componentDidMount(){
		const { title } = this.props.navigation.state.params

		getDeck(title)
			.then((deck) => {
				this.setState({title: deck.title, questions: deck.questions})
			});
	}

	render(){
		const {title, questions} = this.state
		return(
			<View style={styles.container}>
				<Text style={styles.deckText}>{title}</Text>
				<Text style={styles.deckTextCounting}>{questions.length} cards</Text>
				<TouchableOpacity style={[styles.quizBtn, styles.addQuizBtn]}
		            onPress={() => this.props.navigation.navigate(
						'AddCard',
						{ title: title, refreshCards: this.refreshCards}
					)}
		          >
		          <Text style={[styles.quizBtnText, styles.addQuizBtnText]}>Add Card</Text>
		        </TouchableOpacity>
				
				{questions.length > 0 &&
					<TouchableOpacity style={[styles.quizBtn, styles.startQuizBtn]}
						onPress={() => this.props.navigation.navigate(
							'StartQuiz',
							{ 	title: title, 
								questions: questions
							}
						)}
					>
					<Text style={[styles.quizBtnText, styles.startQuizBtnText]}>Start Quiz</Text>
					</TouchableOpacity>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container: {
    	flex: 1,
    	backgroundColor: white,
    	justifyContent: 'center',
    	alignItems: 'center'
    },
    deckText: {
    	fontSize: 40,
    	alignSelf: 'center'
    },
    deckTextCounting: {
    	fontSize: 30,
    	color: gray,
    	alignSelf: 'center'
    },
    quizBtn: {
    	marginTop: 10,
    	marginBottom: 10,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderColor: yellow
    },
    quizBtnText: {
        fontSize: 22,
        textAlign: 'center'
    },
    startQuizBtn:{
        backgroundColor: yellow,
    },
    startQuizBtnText: {
    	color: white
    },
    addQuizBtn:{
        backgroundColor: white,
    },
    addQuizBtnText: {
    	color: yellow
    }
})

export default connect()(DeckDetail)